// imports

const router = require('express').Router();
const { Usermodel, Postmodel, Commentmodel } = require('../../models');

// get all users
router.get('/', (req, res) => {
    Usermodel.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(userDB => res.json(userDB))
    .catch(err => res.status(500).json(err));
});

// get by id
router.get('/:id', (req, res) => {
    Usermodel.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Postmodel,
                attributes: [
                    'id',
                    'title',
                    'content',
                    'created_at',
                ]
            },
            {
                model: Commentmodel,
                attributes: [
                    'id',
                    'text',
                    'created_at',
                ],
                include: {
                    model: Postmodel,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(userDB => {
        if (!userDB) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(userDB);
        }
    })
    .catch(err => res.status(500).json(err));
});

// add user
router.post('/', (req, res) => {

    Usermodel.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    })
    .then(userDB => {
        req.session.save(()  => {
            req.session.userId = userDB.id;
            req.session.loggedIn = true;
            req.session.username = userDB.username;
            
            res.json(userDB);
        })
    })
    .catch(err => res.status(500).json(err));
});

// login
router.post('/login', (req, res) => {
    Usermodel.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(userDB => {
        if (!userDB) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const validatePW = userDB.checkPassword(req.body.password);
        
        if (!validatePW) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }

        req.session.save(() => {
            req.session.userId = userDB.id;
            req.session.loggedIn = true;
            req.session.username = userDB.username;
            res.json(userDB);
            res.json({ user: userDB, message: 'loged in' });
            
        });
    });
});

// logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
});

// update user
router.put('/:id', (req, res) => {
    Usermodel.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    })
    .then(userDB => {
        if (!userDB) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(userDB);
    })
    .catch(err => res.status(500).json(err));
});

// delete user
router.delete('/:id', (req, res) => {
    Usermodel.destroy({
        where: { id: req.params.id }
    })
    .then(userDB => {
        if (!userDB) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(userDB);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
