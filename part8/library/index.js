const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const { PORT, MONGODB_URI } = require("./utils/config");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

require("dotenv").config();

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    me: User
    allBooksFavoriteGenre: [Book!]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User,
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Book: {
    author: async (root) => {
      return await Author.findById(root.author);
    },
  },
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.find({ name: args.author });
        return Book.find({ author: author, genres: args.genre });
      }
      if (args.author) {
        const author = await Author.find({ name: args.author });
        return Book.find({ author: author });
      }
      if (args.genre) {
        return Book.find({ genres: args.genre });
      }
      return Book.find({});
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
    allBooksFavoriteGenre: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      return Book.find({ genres: currentUser.favoriteGenre });
    },
  },
  Mutation: {
    addBook: async (roots, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const authorExists = await Author.findOne({
        name: args.author,
      });
      let book;

      // If the author of the book does not exist in the database yet, add it to the database
      if (!authorExists) {
        const author = new Author({ name: args.author, bookCount: 1 });
        await author.save();
        book = new Book({ ...args, author: author });
      } else {
        // If author of book already exists, update the bookCount
        const author = await Author.collection.findOneAndUpdate(
          { name: args.author },
          { $inc: { bookCount: 1 } }
        );
        book = new Book({ ...args, author: author });
      }
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return book;
    },
    editAuthor: async (roots, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo }
      );
    },
    createUser: async (roots, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      // Hardcoded password for the time being
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: parseInt(PORT) },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
