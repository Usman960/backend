const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
var express = require("express");
var router = express.Router();

router.get("/getRecipe", async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.body.recipeId }).populate({path:'ingredients'})
        if (!recipe) return res.json({ msg: "RECIPE NOT FOUND" })
        res.json({ data: recipe })
    } catch (error) {
        console.error(error)
    }
});

/******* above are all the routes that WILL NOT pass through the middleware ********/

router.use((req, res, next) => {
    if (!req.user.admin) return res.json({ msg: "NOT ADMIN" })
    else next()
})

/******* below are all the routes that WILL pass through the middleware ********/

router.post("/addIngredient", async (req, res) => {
    try {
        const {name, description} = req.body;
        let ingredient = await Ingredient.findOne({name: req.body.name});
        if (ingredient) return res.json({msg: "INGREDIENT ALREADY EXISTS"});
        await Ingredient.create({name, description})
        res.json({msg: "INGREDIENT ADDED"})
    } catch(error) {
        console.error(error);
    }
});

router.post("/addIngredientInRecipe", async (req, res) => {
    try {
        const {recipeId, ingredientId} = req.body;
        let recipe = await Recipe.findOne({_id: req.body.recipeId});
        if (!recipe) return res.json({mgs: "RECIPE NOT FOUND"})

        let ingredient = await Ingredient.findOne({_id: req.body.ingredientId})
        if (!ingredient) return res.json({msg: "INGREDIENT NOT FOUND"});

        recipe.ingredients = [...recipe.ingredients,ingredientId];
        await recipe.save();       
        res.json({msg: "INGREDIENT ADDED IN RECIPE"})
    } catch(error) {
        console.error(error);
    }
});


router.post("/addRecipe", async (req, res) => {
    try {
        const {name, description, ingredients} = req.body;
        let recipe = await Recipe.findOne({name: req.body.name});
        if (recipe) return res.json({ msg: "RECIPE ALREADY EXISTS" });
        await Recipe.create({ ...req.body, ingredients })
        res.json({ msg: "RECIPE ADDED" })
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;