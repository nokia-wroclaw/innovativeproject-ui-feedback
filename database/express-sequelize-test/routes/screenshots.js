var express = require('express');
var router = express.Router();
var model = require('../models/index');
const cors = require('cors');
router.use(cors());

/* GET Screenshot listing. */
router.get('/', function (req, res, next) {
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

router.post('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const {
        title
    } = req.body;
    model.Screenshot.create({
        title: title
    })
        .then(Screenshot => res.status(201).json({
        error: false,
        data: Screenshot,
        message: 'New Screenshot has been created.'
    }))
});


/* Delete Screenshot. */
router.delete('/:id', function (req, res, next) {
    const screenshot_id = req.params.id;

    model.Screenshot.destroy({ where: {
            id: screenshot_id
        }})
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