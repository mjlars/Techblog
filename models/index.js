// require all the models
const Postmodel = require('./postModel');
const Usermodel = require('./userModel');
const Commentmodel = require('./commentModel');

// set relationships between posts, users, and comments

// set what user owns
Usermodel.hasMany(Postmodel, {
    foreignKey: 'user_id'
});

Usermodel.hasMany(Commentmodel, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// set what post belongs to
Postmodel.belongsTo(Usermodel, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// set what post owns
Postmodel.hasMany(Commentmodel, {
    foreignKey: 'post_id'
});

// set what comment belongs to
Commentmodel.belongsTo(Postmodel, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

Commentmodel.belongsTo(Usermodel, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

module.exports = { Postmodel, Usermodel, Commentmodel };
