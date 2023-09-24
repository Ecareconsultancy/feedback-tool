const express = require('express');
const Feedback = require('../models/feedback');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({});
        res.render('index', { feedbacks, isAuthenticated: req.isAuthenticated() });
    } catch (err) {
        console.error('Error fetching feedbacks:', err);
        res.sendStatus(500);
    }
});

router.post('/feedback', async (req, res) => {
    try {
        const feedback = new Feedback({ content: req.body.content });
        await feedback.save();
        res.redirect('/');
    } catch (err) {
        console.error('Error saving feedback:', err);
        res.sendStatus(500);
    }
});

// ... any other feedback routes ...

module.exports = router;

