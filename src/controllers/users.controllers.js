const userController = {};

const passport = require('passport');

const User = require('../models/User');

userController.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

userController.signUp = async (req, res) => {
    const errors = [];
    const { name, lastname, email, password, confirm_password, phone, city, street, number } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'Passwords do not match' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            lastname,
            email,
            password,
            confirm_password,
            phone,
            city,
            street,
            number
        })
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ name, lastname, email, password, phone, city, street, number });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signin');
        }
    }
};

userController.renderSignInForm = (req, res) => {
    res.render('users/signin');
};

userController.signIn = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

userController.logOut = (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/signin');
}

userController.account = (req, res) => {
    res.render('users/account');
}

userController.deleteAccount = (req, res, next) => {
    User.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (err) {
            req.flash("error_msg", err);
            return res.redirect("/users/account/options");
        }
        req.flash("success_msg", "Your account has been deleted.");
        req.logout();
        return res.redirect("/");
    });
}

userController.options = (req, res) => {
    res.render('users/options');
};

userController.renderChangePassword = (req, res) => {
    res.render('users/changepassword');
};

userController.changePassword = async (req, res) => {
    
};


module.exports = userController;