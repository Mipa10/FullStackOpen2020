const blogsRouter = require("express").Router();

const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', (req, res) => {
  const blog = {
    likes: req.body.likes
  }
  Blog.findByIdAndUpdate(req.params.id, blog, {new:true} )
  .then(updatedBlog => {
    res.json(updatedBlog.toJSON())
  })
  .catch(error => next(error))
})

module.exports = blogsRouter;
