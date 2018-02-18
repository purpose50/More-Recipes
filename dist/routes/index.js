'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _homePage = require('../controller/homePage');

var _homePage2 = _interopRequireDefault(_homePage);

var _recipeController = require('../controller/recipeController');

var _recipeController2 = _interopRequireDefault(_recipeController);

var _userController = require('../controller/userController');

var _userController2 = _interopRequireDefault(_userController);

var _middleware = require('../controller/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//  router.get('/', HomePage.homePage);
router.get('/api/v1/recipes/page/:page', _recipeController2.default.getAllRecipe);
router.get('/api/v1/latest/recipes', _recipeController2.default.getLatestRecipe);
router.get('/api/v1/popular/recipes', _recipeController2.default.getPopularRecipe);
router.get('/api/v1/recipes/:recipeId', _recipeController2.default.getSingleRecipe);
router.get('/api/v1/:userId/recipes/', _middleware2.default.verifyToken, _recipeController2.default.getUserRecipes);
router.post('/api/v1/recipes', _middleware2.default.validateAddRecipe, _middleware2.default.verifyToken, _recipeController2.default.addRecipe);
router.put('/api/v1/recipes/:recipeId', _middleware2.default.verifyToken, _recipeController2.default.updateRecipe);
router.get('/api/v1/reviews/:recipeId', _recipeController2.default.getRecipeReviews);
router.delete('/api/v1/recipes/:recipeId', _middleware2.default.verifyToken, _recipeController2.default.deleteRecipe);
router.post('/api/v1/recipes/:recipeId/reviews', _middleware2.default.verifyToken, _recipeController2.default.addReview);
router.post('/api/v1/users/signup', _middleware2.default.validateUserSignup, _userController2.default.signup);
router.post('/api/v1/users/signin', _middleware2.default.validateUserSignin, _userController2.default.signin);
router.get('/api/v1/users', _userController2.default.findAllUsers);
router.put('/api/v1/user/:userId', _userController2.default.updateProfile);
router.get('/api/users/:userId/recipes/:page', _middleware2.default.verifyToken, _recipeController2.default.getUserFavourites);
router.post('/api/v1/recipes/:recipeId', _middleware2.default.verifyToken, _recipeController2.default.addUserFavourite);
router.post('/api/v1/recipes/upvote/:recipeId', _middleware2.default.verifyToken, _recipeController2.default.upvote);
router.post('/api/v1/recipes/downvote/:recipeId', _middleware2.default.verifyToken, _recipeController2.default.downvote);

exports.default = router;