const faker = require('faker');
const db = require('../config/firebase');

const generateFakeRecipe = async (req, res) => {
    try {
        const users = [];
        let usersCollection = await db.collection('users').get();
        let no_records = req.params.no_records;
        usersCollection.docs.forEach(element => {
            users.push(element.id);
        });

        for (let i = 0; i < no_records; i++) {
            let recipeName = faker.lorem.word();
            let preparationTime = Math.floor(Math.random() * 110 + 10);
            let recipeInstruction = faker.lorem.paragraph();
            let userId = faker.random.arrayElement(users);
            const ingredients = [];
            for (let i = 0; i < Math.floor(Math.random() * 4 + 1); i++) {
                ingredients.push(faker.lorem.word());
            }

            const fakeRecipe = {
                recipeName: recipeName,
                preparationTime: preparationTime,
                userId: userId,
                instruction: recipeInstruction,
                ingredients: ingredients,
            };

            await db.collection('recipes').add(fakeRecipe);
        }
        res.status(201).json({
            message: 'Recipes added',
        });
    } catch (e) {
        res.status(500).json({
            message: `Server error: ${e}`,
        });
    }
};

const createRecipe = async (req, res) => {
    try {
        const userId = req.params.userId;
        let recipeData = req.body;
        recipeData.userId = userId;

        await db.collection('recipes').add(recipeData);
        res.status(201).json({
            message: 'Recipe was created!',
        });
    } catch (e) {
        res.status(500).json({
            message: `Something went wrong!`,
        });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        let newRecipeData = req.body;
        await db.collection('recipes').doc(recipeId).update(newRecipeData);
        res.status(202).json({ message: 'Recipe updated!' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        await db.collection('recipes').doc(recipeId).delete();
        res.status(202).json({ message: 'Recipe deleted!' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const getRecipesForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        let recipes = [];
        await db
            .collection('recipes')
            .where('userId', '==', userId)
            .get()
            .then(querySnapshot => {
                let recipe;
                querySnapshot.forEach(doc => {
                    recipe = doc.data();
                    recipe.id = doc.id;
                    recipes.push(recipe);
                });
            });

        for (let i = 0; i < recipes.length; i++) {
            let items = [];
            let itemCollection = await db
                .collection('items')
                .where('recipeId', '==', recipes[i].id)
                .get()
                .then(querySnapshot => {
                    let item;
                    querySnapshot.forEach(doc => {
                        item = doc.data();
                        item.id = doc.id;
                        items.push(item);
                    });
                });
            recipes[i].items = items;
        }
        res.status(200).json({
            message: 'Success!',
            recipes: recipes,
        });
    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }
};

const getAllRecipes = async (req, res) => {
    try {
        let recipes = [];
        await db
            .collection('recipes')
            .get()
            .then(querySnapshot => {
                let recipe;
                querySnapshot.forEach(doc => {
                    recipe = doc.data();
                    recipe.id = doc.id;
                    recipes.push(recipe);
                });
            });

        for (let i = 0; i < recipes.length; i++) {
            let items = [];
            let itemCollection = await db
                .collection('items')
                .get()
                .then(querySnapshot => {
                    let item;
                    querySnapshot.forEach(doc => {
                        item = doc.data();
                        item.id = doc.id;
                        items.push(item);
                    });
                });
            recipes[i].items = items;
        }
        res.status(200).json({
            message: 'Success!',
            recipes: recipes,
        });
    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }
};

module.exports = {
    generateFakeRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipesForUser,
    getAllRecipes,
};
