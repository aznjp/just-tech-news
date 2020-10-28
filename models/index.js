const User = require('./User');
const Post = require("./Post");
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations
/* In this statement, we are defining the relationship of the Post model to the User. 
The constraint we impose here is that a post can belong to one user, but not many users. 
Again, we declare the link to the foreign key, which is designated at user_id in the Post model.*/

/* =========== User/Post ============== */
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

/* =========== Vote ============== */
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

/* =========== Comment ============== */
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

/* Note that we don't have to specify Comment as a through table like we did for Vote. 
This is because we don't need to access Post through Comment; we just want to see the user's comment and which post it was for. 
Thus, the query will be slightly different. */


User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };