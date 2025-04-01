const express = require('express');
const router = express.Router();
// const {bmiCon} = require('../controllers/bmiController');
const { bmiCalculator } = require('../controllers/bmiCalculator');

// BMI calculation route
router.post("/calculate-bmi", bmiCalculator);

module.exports = router;
