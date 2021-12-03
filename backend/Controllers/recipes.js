const faker = require('faker');
const db = require('../config/firebase');

const generateFakeRecipe = async (req, res) => {
    try {
        const users = [];
        let usersCollection = await db.collection('users').get();
        let no_records = req.params.no_records;
        usersCollection.docs.forEach(element => {
            users.add(element.id);
        });

        for (let i = 0; i < no_records; i++) {
            let recipeName = faker.lorem.word();
            let preparationTime = faker.random.number();
            let userId = faker.random.arrayElement(users);
            const ingredients = [];
            for (let i = 0; i < Math.floor(Math.random() * 4 + 1); i++) {
                ingredients.add(faker.lorem.word());
            }

            const fakeRecipe = {
                recipeName: recipeName,
                preparationTime: preparationTime,
                userId: userId,
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
        fridgeData.userId = userId;

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
        await db.collection('fridges').doc(recipeId).update(newRecipeData);
        res.status(202).json({ message: 'Recipe updated!' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        await db.collection('fridges').doc(recipeId).delete();
        res.status(202).json({ message: 'Recipe deleted!' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = {
    generateFakeRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
};
