const bcryptjs = require("bcryptjs");
// const { response } = require('express')
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (req, res, next) => {
  const body = req.body;

  if (body.password.length <= 3) {
    return res.status(400).json({ error: "password too short" });
  }

  const saltRounds = 10;
  const passwordHash = await bcryptjs.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1
  });
  
  
  res.json(users.map(u => u.toJSON()));
});

module.exports = usersRouter;
