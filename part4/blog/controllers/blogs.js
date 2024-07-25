const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blogs = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const body = request.body;

      const user = await request.user;

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id,
        likes: body.likes,
      });

      const savedBlog = await blog.save();

      user.blogs = user.blogs.concat(savedBlog.id);
      await user.save();

      await savedBlog.populate("user", { username: 1, name: 1 });

      response.status(201).json(savedBlog);
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const blog = await Blog.findById(request.params.id);
      const user = await request.user;

      if (blog.user.toString() === user.id.toString()) {
        const result = await Blog.findByIdAndDelete(request.params.id);

        response.status(204).json(result);
      } else {
        return response.status(401).json({
          error:
            "token/user is invalid, deleting a blog post can only be done by the user who created it",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const body = request.body;

    const blog = {
      user: body.user,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    }).populate("user", { username: 1, name: 1 });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

// API request to add a comment (POST request to 'api/blogs/:id/comments' endpoint)
blogsRouter.post("/:id/comments", async (request, response, next) => {
  try {
    const comment = request.body.comment;

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { $push: { comments: comment } },
      {
        new: true,
      }
    );
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
