const express = require('express');
const router = express.Router();
const model = require('../models/index');


router.get('/', function (req, res) {
  model.Comment.findAll({})
	.then(comments => res.json(comments))
	.catch(error => res.json({
		error
	}));
});
router.get('/:screenshotId', function (req, res) {
	const screenshotId=req.params.screenshotId;
    model.Comment.findAll({
		where: {
			ScreenshotId : screenshotId
		}
	})
        .then(comments => res.json(comments))
        .catch(error => res.json({
            error
        }));
});


router.post('/', function (req, res) {
	const {x,y, description} = req.body;

		model.Comment.create({
			x:x,
			y:y,
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
	}));
});

module.exports = router;