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
            });
        })
});


router.post('/', function (req, res) {
    model.Screenshot.create({
        title: req.body.title,
        Comments: [{
            x: req.body.Comment.x,
            y: req.body.Comment.y,
            description: req.body.Comment.description
        }]
    }, {
        include: [model.Comment]
    })
        .then(Screenshot => res.status(201).json({
            error: false,
            data: Screenshot,
            message: 'New Screenshot has been created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
        }));
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
        }));
});

module.exports = router;