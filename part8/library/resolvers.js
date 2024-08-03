const { GraphQLError } = require("graphql");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
