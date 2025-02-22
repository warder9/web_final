const Workout = require('../models/Workout');  

exports.addWorkout = async (req, res) => {  
    try {  
        const { exercises } = req.body;  
        const workout = new Workout({ userId: req.user.id, exercises });  
        await workout.save();  
        res.status(201).json(workout);  
    } catch (error) {  
        res.status(500).json({ error: 'Server error' });  
    }  
};  

exports.getWorkouts = async (req, res) => {  
    try {  
        const workouts = await Workout.find({ userId: req.user.id });  
        res.json(workouts);  
    } catch (error) {  
        res.status(500).json({ error: 'Server error' });  
    }  
};  
