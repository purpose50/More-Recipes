import express from 'express';
import RecipeController from '../controller/recipeController';
import UserController from '../controller/userController';
import Middleware from '../controller/middleware';

const router = express.Router();

router.get('/api/v1/recipes', RecipeController.getAllRecipe);
router.get('/api/v1/search/recipes', RecipeController.searchRecipes);
router.get('/api/v1/latest/recipes', RecipeController.getLatestRecipe);
router.get('/api/v1/popular/recipes', RecipeController.getPopularRecipe);
router.get('/api/v1/recipes/:recipeId', Middleware.getUserId, RecipeController.getSingleRecipe);
router.get('/api/v1/:userId/recipes/', Middleware.verifyToken, RecipeController.getUserRecipes);
router.post('/api/v1/recipes', Middleware.validateAddRecipe, Middleware.verifyToken, RecipeController.addRecipe);
router.put('/api/v1/recipes/:recipeId', Middleware.verifyToken, RecipeController.updateRecipe);
router.get('/api/v1/reviews/:recipeId', RecipeController.getRecipeReviews);
router.delete('/api/v1/recipes/:recipeId', Middleware.verifyToken, RecipeController.deleteRecipe);
router.post('/api/v1/recipes/:recipeId/reviews', Middleware.verifyToken, RecipeController.addReview);
router.post('/api/v1/users/signup', Middleware.validateUserSignup, UserController.signup);
router.post('/api/v1/users/signin', Middleware.validateUserSignin, UserController.signin);
router.post('/api/v1/users/signout/:token', UserController.signout);
router.get('/api/v1/users', UserController.findAllUsers);
router.put('/api/v1/user/:userId', Middleware.verifyToken, UserController.updateProfile);
router.put('/api/v1/:userId/user', Middleware.verifyToken, UserController.updatePassword);
router.get('/api/v1/users/:userId/recipes/:page', Middleware.verifyToken, RecipeController.getUserFavourites);
router.post('/api/v1/recipes/:recipeId', Middleware.verifyToken, RecipeController.addUserFavourite);
router.delete('/api/v1/:recipeId/recipes', Middleware.verifyToken, RecipeController.deleteUserFavorite);
router.post('/api/v1/recipes/upvote/:recipeId', Middleware.verifyToken, RecipeController.upvote);
router.post('/api/v1/recipes/downvote/:recipeId', Middleware.verifyToken, RecipeController.downvote);


export default router;
