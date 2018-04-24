const express = require('express');
const router = express.Router();
const model = require('../models/index');


router.get('/', function (req, res) {
  model.Comment.findAll({})
	.then(comments => res.json({
		error: false,
		data: comments
	}))
	.catch(error => res.json({
		error: true,
		data: [],
		error: error
	}));
});


router.post('/', function (req, res) {
	const {topic, description} = req.body;

		model.Comment.create({
			topic: topic,
			description: description
		})
		.then(Comment => res.status(201).json({
			error: false,
			data: Comment,
			message: 'New Comment has been created.'
		}))
		.catch(error => res.json({
			error: true,
			data: [],
			error: error
		}));
});


router.put('/:id', function (req, res) {
	const comment_id = req.params.id;
	const {topic, description} = req.body;

	model.Comment.update({
		topic: topic,
		description: description
	}, {
		where: {
			id: comment_id
		}
	})
	.then(Comment => res.status(201).json({
		error: false,
		message: 'Comment has been updated.'
	}))
	.catch(error => res.json({
		error: true,
		error: error
	}));
});


router.delete('/:id', function (req, res) {
	const comment_id = req.params.id;

	model.Comment.destroy({
		where: {
		  id: comment_id
	  }
	})
	.then(status => res.status(201).json({
		error: false,
		message: 'Comment has been delete.'
	}))
	.catch(error => res.json({
		error: true,
		error: error
	}));
});

module.exports = router;