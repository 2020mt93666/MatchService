const db = require("../models");
const MatchModel = db.matches;

// Create and Save a new match
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a match
  const match = new MatchModel({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save match in the database
  match
    .save(match)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the match."
      });
    });
};

// Retrieve all matches from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  MatchModel.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving matches."
      });
    });
};

// Find a single match with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MatchModel.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found match with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving match with id=" + id });
    });
};

// Update a match by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  MatchModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update match with id=${id}. Maybe match was not found!`
        });
      } else res.send({ message: "match was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating match with id=" + id
      });
    });
};

// Delete a match with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  MatchModel.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete match with id=${id}. Maybe match was not found!`
        });
      } else {
        res.send({
          message: "match was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete match with id=" + id
      });
    });
};