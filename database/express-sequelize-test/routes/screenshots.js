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
   return model.sequelize.transaction(t =>
        model.Screenshot.create({
            title: req.body.title,
        }, {
            transaction: t
        })
            .then(Screenshot => {
                const comment_array = req.body.comments.map(comment => (
                    {
                        ScreenshotId: Screenshot.id,
                        x: comment.x,
                        y: comment.y,
                        description: comment.description,
                        author: comment.author

                    }
                ));
                    return model.Comment.bulkCreate(comment_array, {transaction: t})
                        .then(()=>res.status(201).json({
                        error: false,
                        data: Screenshot,
                        message: 'New Screenshot has been created.'
                    }))
                        .catch(error => res.json({
                            error: true,
                            data: [],
                        }));
                }
            )

    )


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