const express = require('express');
const router = express.Router();
const model = require('../models/index');


router.get('/', function (req, res) {
    model.Response.findAll({})
        .then(responses => res.json(responses))
        .catch(error => res.json({
            error
        }));
});
router.get('/:commentId', function (req, res) {
    const commentId=req.params.commentId;
    model.Response.findAll({
        where: {
            commentId : commentId
        }
    })
        .then(responses => res.json(responses))
        .catch(error => res.json({
            error
        }));
});


router.post('/', function (req, res) {
    const {description} = req.body;

    model.Response.create({
        description: description
    })
        .then(Response => res.status(201).json({
            error: false,
            data: Response,
            message: 'New Response has been created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
        }));
});



module.exports = router;

