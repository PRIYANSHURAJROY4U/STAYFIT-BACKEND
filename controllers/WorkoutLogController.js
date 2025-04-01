// controllers/workoutLogController.js
const WorkoutLog = require('../model/Workout.logModel');

// Get all workout logs for a user
exports.getWorkoutLogs = async (req, res) => {
  try {
    const logs = await WorkoutLog.find({ userId: req.user.id });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new workout log
exports.addWorkoutLog = async (req, res) => {
  const { exercises, customNotes } = req.body;

  try {
    const newLog = new WorkoutLog({
      userId: req.user.id,
      exercises,
      customNotes,
    });

    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a custom workout log for a specific day
exports.addCustomWorkoutLog = async (req, res) => {
  const { date, exercises, customNotes } = req.body;

  try {
    const newLog = new WorkoutLog({
      userId: req.user.id,
      date,
      exercises,
      customNotes,
    });

    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};