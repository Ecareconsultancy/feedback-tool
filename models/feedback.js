const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    content: String,
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
