// imports
const router = require('express').Router();
const { Usermodel, Postmodel, Commentmodel } = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts
router.get('/api/posts', (req, res) => {
    console.log('getting all the posts')
    Postmodel.findAll({
        attributes: [
            'id',
            'title',
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

    .then(postDB => res.json(postDB))

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get post by id
router.get('/api/posts/:id', (req, res) => {
    console.log('getting post by id')
    Postmodel.findOne({
        where: { id: req.params.id },
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
        if (!postDB) {
            res.status(404).json({ message: 'Post not found' });
            return;
        } else {
            res.json(postDB);
        }
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create post
router.post('/api/posts', withAuth, (req, res) => {
    console.log('creating a post')
    Postmodel.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.userId
    })

    .then(postDB => {
        res.json(postDB);
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// put post
router.put('/api/posts/:id', withAuth, (req, res) => {
    console.log('updating a post')
    Postmodel.update({
        title: req.body.title,
        content: req.body.content,
    }, {
        where: { id: req.params.id }
    })

    .then(postDB => {
        if (!postDB) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(postDB);
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete post
router.delete('/api/posts/:id', withAuth, (req, res) => {
    console.log('deleting a post')
    Postmodel.destroy({
        where: { id: req.params.id }
    })

    .then(postDB => {
        if (!postDB) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(postDB);
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;