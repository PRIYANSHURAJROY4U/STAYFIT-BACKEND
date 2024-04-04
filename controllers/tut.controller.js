const db = require("../model");

const Tutorial = db.tutorial;

// creation of tutorial
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "content cannot be empty" });
    return;
  }

  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  tutorial
    .save(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "error occured while creation" });
    });
};
// Retrieve all tutorials from the database

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Tutorial.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "error occured while retrieving" });
    });
};

// find with _id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Tutorial.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Not found Tutorial with id ${id}` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving tutorial with id ${id}: ${err.message}`,
      });
    });
};

// update tut by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(500).send({ message: "update cannot be empty" });
  }
  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "no data found" });
      } else {
        res.send({ message: "tut updated succesfully" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "error in updation with given id " + id });
    });
};

// delete by id
exports.delete = (req, res) => {
  const id = req.params.id;
  //as findidanddelte is deprecated we can use findOneAndDelete
  Tutorial.findOneAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "tutorial not found ig with this id" });
      } else {
        res.send({ message: "deleted successfullly" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "error into deletion with id" + id });
    });
};

exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} tutorial deleted successfully`,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "error in delete  all tutorials" });
    });
};

exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .populate("author") // populate author details from users collection
    .sort([["date", -1]]) // sort by date in descending order
    .exec()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "error in searching" });
    });
};
