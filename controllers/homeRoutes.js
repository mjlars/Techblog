// imports
const router = require('express').Router();
const sqlz = require('../cfg/connection');
const { Usermodel, Postmodel, Commentmodel } = require('../models');

// get posts

router.get('/', (req, res) => {
    console.log('getting all the posts')
    Postmodel.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
        ],
        include: [
            {
                model: Postmodel,
                attributes: [
                    'id',
                    'text',
                    'created_at',
                    'user_id',
                    'post_id',
                ],
                include: {
                    model: Usermodel,
                    attributes: ['username']
                }
            },
            {
                model: Usermodel,
                attributes: ['username']
            }
        ]
    })

    .then(postDB => {
        const posts = postDB.map(post => post.get({ plain: true }));
        
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// set up '/posts' route
router.get('/posts', (req, res) => {
    console.log('getting all the posts')
    Postmodel.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
        ],
        include: [
            {
                model: Postmodel,
                attributes: [
                    'id',
                    'text',
                    'created_at',
                    'user_id',
                    'post_id',
                ],
                include: {
                    model: Usermodel,
                    attributes: ['username']
                }
            },
            {
                model: Usermodel,
                attributes: ['username']
            }
        ]
    })

    .then(postDB => {
        const posts = postDB.map(post => post.get({ plain: true }));
        
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// get a single post
router.get('/posts/:id', (req, res) => {
    Postmodel.findOne({
        where: { id: req.params.id},
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
        ],
        include: [
            {
                model: Commentmodel,
                attributes: [
                    'id',
                    'text',
                    'created_at',
                    'user_id',
                    'post_id',
                ],
                include: {
                    model: Usermodel,
                    attributes: ['username']
                }
            },
            {
                model: Usermodel,
                attributes: ['username']
            }
        ]

    })

    .then(postDB => {
        if(!postDB) {
            res.status(404).json({
                message: 'Post not found'
            });
            return;
        }
        const post = postDB.get({ plain: true });

        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get login
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('./login');
});

module.exports = router;