// imports
const router = require('express').Router();
const sqlz = require('../cfg/connection');
const { Postmodel, Usermodel, Commentmodel } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    console.log('getting all the posts for dashboard')
    Postmodel.findAll({
        where: {
            user_id: req.session.userId
        },
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
        const posts = postDB.map(post => post.get({ plain: true }));
        
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// get posts you can edit
router.get('/edit/:id', withAuth, (req, res) => {
    Postmodel.findbyPK(req.params.id, {
        attributes: [
            'id',
            'title',
            'created_at',
            'post_url',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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
        if(postDB) {
            const post = postDB.get({ plain: true });
            res.render('edit', {
                post,
                loggedIn: true
            });
        } else {
            res.status(404).end();
        }
    })
    
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
