const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;