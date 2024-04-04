const dbconfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};  // An empty object db is created to store the database connection and any models that are created.
db.mongoose = mongoose;  //The mongoose object is added to the db object as db.mongoose.
db.url = dbconfig.url;
db.tutorial = require("../model/tutorial.model.js")(mongoose);

module.exports = db;
