const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('./models/user');
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/feedback-tool', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Passport Configuration
passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Middleware Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRoutes);
app.use(feedbackRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
