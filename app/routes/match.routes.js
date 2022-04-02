module.exports = app => {
  const matches = require("../controllers/match.controller.js");

  var router = require("express").Router();

  // Retrieve all matches
  router.get("/", matches.findAll);

  // Retrieve a single match with id
  router.get("/:id", matches.findOne);

  // Create a new match
  router.post("/", matches.create);

  // Update a match with id
  router.put("/:id", matches.update);

  // Delete a match with id
  router.delete("/:id", matches.delete);

  app.use("/api/matches", router);
};
