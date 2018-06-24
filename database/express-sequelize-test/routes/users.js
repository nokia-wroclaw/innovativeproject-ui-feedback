const express = require('express');
const router = express.Router();
const model = require('../models/index');

router.get('/', function (req, res) {
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


router.post('/', function (req, res) {

    model.User.find({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(function (data) {
    	if(!data) {
            res.sendStatus(401)
        }
        else {
    		res.sendStatus(201)
		}
    })

});


router.put('/:id', function (req, res) {
	const user_id = req.params.id;
	const {name, team, email} = req.body;

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


router.delete('/:id', function (req, res) {
	const user_id = req.params.id;

	model.User.destroy({
		where: {
			id: user_id
		}
	})
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