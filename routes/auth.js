const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// GET route to show the login form
router.get('/login', (req, res) => {
    res.render('login');
});

// POST route to handle login authentication
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// GET route to show the registration form (optional, based on your needs)
router.get('/register', (req, res) => {
    res.render('register');
});

// POST route to handle user registration
router.post('/register', async (req, res) => {
    try {
        const user = new User({ username: req.body.username, password: req.body.password });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.redirect('/register');
    }
});

// GET route to handle user logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;

