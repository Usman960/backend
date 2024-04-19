const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullName: String,
    admin: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now
    },
    recipes : [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}
    ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;