const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");


const mongoUrl = config.MONGODB_URI;
logger.info("connecting to", mongoUrl);
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
      logger.error('error connecting to MongoDB', error.message)
  });
  
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

// blogsRouter.get("/", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// blogsRouter.post("/", (request, response) => {
//   if (!request.body.title || !request.body.url) {
//     response.status(400)
//   }
//   const blog = new Blog(request.body);
   

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

// blogsRouter.delete('/:id', (req,res) => {

// })

module.exports = app;
