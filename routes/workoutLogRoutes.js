// routes/workoutLogRoutes.js
const express = require('express');
const router = express.Router();
const workoutLogController = require('../controllers/WorkoutLogController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure you have an auth middleware

// Get all workout logs
router.get('/workoutLog', authMiddleware , workoutLogController.getWorkoutLogs);

// router.get('/workoutLog', authMiddleware, workoutLogController.getWorkoutLogs); // just add authMiddleware to authenticate every request


// Add a new workout log
router.post('/addWorkout',authMiddleware, workoutLogController.addWorkoutLog);

// Add a custom workout log
router.post('/customAdd', authMiddleware,  workoutLogController.addCustomWorkoutLog);

module.exports = router;