const { TestScheduler } = require("jest");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { response } = require("../app");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);

    // await User.deleteMany({})

    // const user = new User({
    //   name: 'mikko',
    //   username: 'mikkouseri',
    //   password: 'salainen'
    // })
    // await user.save();
    // console.log('beforeuser', User.find({}))
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("return right amount of blogs (2)", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  test("id is id, not _id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((element) => {
      expect(element.id).toBeDefined();
    });
  });
  test("able to add one blog", async () => {
    const user = await User.findOne({ username: "mikkouser" });
    console.log("uuseri", user);

    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    };
    const token = "bearer 1234567";
    await api.post("/api/blogs").set({ Authorization: token }).send(newBlog);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("if no likes set it to zero", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    };
    await api.post("/api/blogs", newBlog);
    const response = await api.get("/api/blogs");
    expect(response.body[response.body.length - 1].likes === 0);
  });
  test("no post if no url or no title", () => {
    const newBlogNoTitle = {
      _id: "5a422b3a1b54a676234d17f9",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    };
    api.post("/api/blogs", newBlogNoTitle).expect(400);
  });
  test("delete one", () => {
    api.delete("/api/blogs/5a422aa71b54a676234d17f8").expect(204);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = new User({
      name: "mikko",
      username: "mikkouser",
      password: "salainen",
    });
    await user.save();
  });
  test("reject too short usernames", () => {
    const newUser = {
      name: "mikko",
      username: "mi",
      password: "salainen",
    };

    api.post("/api/users", newUser).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
