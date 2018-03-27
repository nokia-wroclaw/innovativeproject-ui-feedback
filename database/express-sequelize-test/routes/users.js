var express = require('express');
var router = express.Router();
var model = require('../models/index');
 

/* GET User listing. */
router.get('/', function (req, res, next) {
    model.User.findAll({})
        .then(users => res.json({
            error: false,
            data: users
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});
 
/* POST User. */
router.post('/', function (req, res, next) {
    const {
        name,
        team,
        email
    } = req.body;
    model.User.create({
            name: name,
            team: team,
            email: email
        })
        .then(User => res.status(201).json({
            error: false,
            data: User,
            message: 'New User has been created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});
 
 
/* update User. */
router.put('/:id', function (req, res, next) {
 
    const user_id = req.params.id;
 
    const { name, team, email } = req.body;
 
    model.User.update({
            name: name,
            team: team,
            email: email
        }, {
            where: {
                id: user_id
            }
        })
        .then(User => res.status(201).json({
            error: false,
            message: 'User has been updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
}); 
 
/* Delete User. */
router.delete('/:id', function (req, res, next) {
    const user_id = req.params.id;
 
    model.User.destroy({ where: {
        id: user_id
    }})
        .then(status => res.status(201).json({
            error: false,
            message: 'User has been delete.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});
 
module.exports = router;