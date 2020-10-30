const blogsRouter = require("express").Router();
const { request } = require("express");
const jwt = require("jsonwebtoken");

const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogid = request.params.id;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blog = await Blog.findById(blogid);
  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(blogid);
    return response.status(204).end();
  }
});

blogsRouter.put("/:id", (req, res) => {
  const blog = {
    likes: req.body.likes,
  };
  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then((updatedBlog) => {
      res.json(updatedBlog.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
