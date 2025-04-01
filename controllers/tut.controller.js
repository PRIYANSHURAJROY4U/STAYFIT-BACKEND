const db = require("../model");
// const userdb = require("../model/user.model");


const Tutorial = db.tutorial;
const User = db.user;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        .send({ message: err.message || "error occurred while creation" });
    });
};
// Retrieve all tutorials from the database

//new work
exports.register = (req,res) => {
//   if(!req.body.username) {
//     res.status(400).send({message: "username cannot be empty" });
// return;
//   }

//   const user =  new  User({username: req.body.username, password: req.body.password});
  
//   user
//   .save(user)
//   .then((data) => {
//     res.send(data)
//   })
//   .catch((err) => {
//      res
//      .status(500).send({message: err.message || "error occured while registration" }); 
//      res.render('check', { username: req.body.username });
// });

if (!req.body.username || !req.body.password) {
  res.status(400).send({ message: "Username and password are required." });
  return;
}

// Hash the password
bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
  if (err) {
      res.status(500).send({ message: "Error occurred while hashing the password." });
      return;
  }
  
  const user = new User({ username: req.body.username, password: hashedPassword });

  user.save()
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({ message: err.message || "Error occurred while registration." });
      });
});  
 };

 exports.login = (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  User.findOne({ username: username })
      .then(user => {
          if (!user) {
              return res.status(401).send({ message: "Invalid credentials." });
          }

          // Compare hashed password
          bcrypt.compare(password, user.password, (err, result) => {
              if (err || !result) {
                  return res.status(401).send({ message: "Invalid credentials." });
              }

              // User authenticated, generate JWT token
              const token = jwt.sign({ id: user._id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });

              // Send token in response
              res.json({ token: token });
          });
      })
      .catch(err => {
          res.status(500).send({ message: "Error occurred while login." });
      });
};

exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
      return res.status(403).send({ message: 'Token is required.' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
          return res.status(401).send({ message: 'Invalid token.' });
      }
      req.user = decoded;
      next();
  });
};

1





 // new

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

