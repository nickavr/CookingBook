const express = require('express');
const router = express.Router();
const userController = require('../Controllers/users');
const recipeController = require('../Controllers/recipes');
const verifyMiddleware = require('../Middleware/session');
const auth = require('../Controllers/auth');

//user
router.use('/auth/signin', auth.loginUser);
router.use('/auth/register', auth.registerUser);
router.use('/users/generate/:no_records', userController.generateFakeUsers);

//recipes
router.use(
    '/recipes/generate/:no_records',
    recipeController.generateFakeRecipe
);
router.use(
    '/recipes/create/:userId',
    verifyMiddleware.verifyToken,
    recipeController.createRecipe
);
router.use(
    '/recipes/update/:recipeId',
    verifyMiddleware.verifyToken,
    recipeController.updateRecipe
);
router.use(
    '/recipes/delete/:recipeId',
    verifyMiddleware.verifyToken,
    recipeController.deleteRecipe
);
// router.use('/recipes/:userId', recipeController.get);

module.exports = router;
