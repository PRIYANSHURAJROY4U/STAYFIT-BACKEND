
exports.bmiCalculator = async (req, res) => {
    try {
        const { weight, height } = req.body;

        
        if (!weight || !height || weight <= 0 || height <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input. Please provide positive values for weight and height.',
            });
        }

        // Calculate BMI = 
        const bmi = (weight / (height * height)).toFixed(2);

        
        let category;
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
        } else {
            category = 'Obesity';
        }

       
        res.json({
            success: true,
            bmi: parseFloat(bmi),
            category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while calculating BMI.',
        });
    }
};
