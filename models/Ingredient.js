const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
    name: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;