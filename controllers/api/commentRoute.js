// imports
const router = require('express').Router();
const { Usermodel, Postmodel, Commentmodel } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', (req, res) => {
    Commentmodel.findAll()
    .then(commentDB => res.json(commentDB))
    .catch(err => res.status(500).json(err));
    
})

// new comment
router.post('/', withAuth, (req, res) => {
    Commentmodel.create({
        text: req.body.text,
        user_id: req.user.id,
        post_id: req.body.post_id,
    })
    .then(commentDB => res.json(commentDB))
    .catch(err => res.status(500).json(err));
});

// delete comment
router.delete('/:id', withAuth, (req, res) => {
    Commentmodel.destroy({
        where: { id: req.params.id }
    })
    .then(commentDB => {
        if (!commentDB) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        res.json(commentDB);
        
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;