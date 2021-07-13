const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.BMIData = require("./BMIModel");
db.person = require("./person");

module.exports = db;