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
    user: user,
    url: body.url,
    likes: body.likes,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog.toJSON());
});
blogsRouter.delete("/", async (request, response) => {
  await Blog.deleteMany({});
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogid = request.params.id;

  const decodedToken = await jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blog = await Blog.findById(blogid);
  console.log('blog', blog)
  

  if (blog.user._id.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(blogid);
    return response.json(blog.toJSON()).status(204).end();
  }
});

blogsRouter.put("/:id", (req, res) => {
  const newBlog = req.body;

  Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true })
    .then((updatedBlog) => {
      res.json(updatedBlog.toJSON());
    })
    .catch((error) => next(error));
});

blogsRouter.post("/:id/comments", async (req, res) => {
  

  const blogToUpdate = await Blog.findById(req.params.id)

  blogToUpdate.comments = await blogToUpdate.comments.concat(req.body.comment)

  console.log('blogtoupdate', blogToUpdate)
  //console.log('newblog', newBlog)
  

  Blog.findByIdAndUpdate(req.params.id, blogToUpdate, { new: true })
    .then((updatedBlog) => {
      res.json(updatedBlog.toJSON());
    })
    .catch((error) => next(error));
});



module.exports = blogsRouter;
