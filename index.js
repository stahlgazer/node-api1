// import express from 'express'; // es2015 modules, we're not using them
const express = require("express"); // similar to above, but works in all node versions

const server = express();

let users = [
  {
    id: 1,
    name: "georgeY",
    bio: "loves to play basketball",
  },
  {
    id: 2,
    name: "Axley",
    bio: "No, I don't like chopping trees",
  },
  {
    id: 3,
    name: "Laramy29",
    bio: "Tech geek extraordinaire",
  },
];

// middleware
server.use(express.json()); // teaches the server to parse JSON from the body

// endpoints
server.get("/", (req, res) => {
  res.status(200).json({ api: "running....." });
});

server.get("/api/users", (req, res) => {
  if (users) {
    res.status(200).json(users);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);

  if (user) {
    res.status(200).json(user);
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  if (userInfo.name && userInfo.bio) {
    users.push(userInfo);
    res.status(201).json(userInfo);
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

const port = 5000; // the server is running on http://localhost:5000
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));
