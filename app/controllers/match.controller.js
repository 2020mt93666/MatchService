const db = require("../models");
const MatchModel = db.matches;

// Create and Save a new match
exports.create = async (req, res, next) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a match
  const match = new MatchModel({
    name: req.body.name,
    teamA: req.body.teamA,
    teamB: req.body.teamB,
    target: req.body.target,
    actual: req.body.actual,
    status: req.body.status
  });

  try {
    // Save match in the database
    const data = await match.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the match."
    });
  }
};

// Retrieve all matches from the database.
exports.findAll = async (req, res) => {
  const name = req.query.name;
  var condition = name ? {
    name: name
  } : {};

  try {
    if(name)
    {
      const data = await MatchModel.findOne(condition);
      res.send(data);
    }
    else
    {
      const data = await MatchModel.find(condition);
      res.send(data);
    }    
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving matches."
    });
  }
};

// Find a single match with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await MatchModel.findById(id);
    if (!data)
      res.status(404).send({
        message: "Not found match with id " + id
      });
    else res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving match with id=" + id
    });
  }
};

// Update a match by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  try {
    const data = await MatchModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot update match with id=${id}. Maybe match was not found!`
      });
    } else res.send({
      message: "match was updated successfully."
    });
  } catch (err) {
    res.status(500).send({
      message: "Error updating match with id=" + id
    });
  }
};

// Delete a match with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await MatchModel.findByIdAndRemove(id, {
      useFindAndModify: false
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot delete match with id=${id}. Maybe match was not found!`
      });
    } else {
      res.send({
        message: "match was deleted successfully!"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete match with id=" + id
    });
  }
};