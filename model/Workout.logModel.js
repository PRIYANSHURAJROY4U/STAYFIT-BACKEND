// models/WorkoutLog.js
const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  exercises: [
    {
      name: String,
      duration: Number, // in minutes
      caloriesBurned: Number,
      Sets : Number,
      Rep : Number,
    },
  ],
  customNotes: String,
});

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);



// it is example input for test and front-end
// {
//   "exercises" : [
//     {
//    "name" : "priyanshufind1f",
//    "duration": "25", // in minutes
//    "caloriesBurned": "150",
//      "Sets" : "2",
//      "Rep" : "5"
//      }
//      ],
//      "customNotes": "Bench Press"
// }