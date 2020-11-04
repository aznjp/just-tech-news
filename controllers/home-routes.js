const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

const posts = dbPostData.map(post => post.get({ plain: true }));


router.get('/', (req, res) => {
    /*Because we've hooked up a template engine, we can now use res.render() and specify which template we want to use. 
    In this case, we want to render the homepage.handlebars template (the .handlebars extension is implied). */

    /* The res.render() method can accept a second argument, an object, which includes all of the data you want to pass to your template.*/
    Post.findAll({
            attributes: [
                'id',
                'post_url',
                'title',
                'created_at', [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            console.log(dbPostData[0]);
            // pass a single post object into the homepage template
            res.render('homepage', { posts });
        })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


module.exports = router;