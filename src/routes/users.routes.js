const { Router } = require('express');
const router = Router();

const { renderChangePassword, changePassword, options, deleteAccount, account, renderSignInForm, renderSignUpForm, signUp, signIn, logOut } = require('../controllers/users.controllers');
const { isAuthenticated } =require('../helpers/auth');


router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signUp);
router.get('/users/signin', renderSignInForm);
router.post('/users/signin', signIn);
router.get('/users/logout', logOut);
router.get('/users/account', isAuthenticated, account);
router.delete("/users/:id", isAuthenticated, deleteAccount);
router.get('/users/options', isAuthenticated, options);
router.post('/users/changepassword', isAuthenticated, changePassword);
router.get('/users/changepassword', isAuthenticated, renderChangePassword);

module.exports = router;