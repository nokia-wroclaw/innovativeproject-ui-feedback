const express = require('express');
const router = express.Router();
const model = require('../models/index');
const cors = require('cors');
router.use(cors());


router.get('/', function (req, res) {
	model.Screenshot.findAll({})
		.then(Screenshot => res.json(Screenshot))
		.catch(error => {
			return res.json({
				error: true,
				data: [],
				error: error
			});
		})
});


router.post('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});


router.delete('/:id', function (req, res) {
	const screenshot_id = req.params.id;

	model.Screenshot.destroy({
		where: {
			id: screenshot_id
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