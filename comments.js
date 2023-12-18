//Create web server
const express = require('express');
//Create router object
const router = express.Router();
//Import comment model
const Comment = require('../models/comment');
//Import passport
const passport = require('passport');

//Create route to add new comment
router.post('/new', passport.authenticate('jwt', {session: false}), (req, res) => {
    //Get comment data from request
    const commentData = {
        comment: req.body.comment,
        user: req.user.id,
        post: req.body.post
    };
    //Create new comment
    const newComment = new Comment(commentData);
    //Save comment to database
    newComment.save().then(comment => {
        res.json(comment);
    }).catch(error => {
        res.status(500).json(error);
    });
});

//Export router
module.exports = router;
