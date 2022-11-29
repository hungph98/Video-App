const Comment = require("../models/Comment");
const Video = require("../models/Video");
const createError = require("../../err");

class CommentController{

    addComment = async (req, res, next) => {
        const newComment = new Comment({...req.body, userId:req.user.id});
        try {
            const saveComment = await newComment.save();
            res.status(200).json(saveComment);
        } catch (err) {
            next(err);
        }
    }

    deleteComment = async (req, res, next) => {
        try {
            const comment = await Comment.findById(req.params.id);
            const video = await Video.findById(req.params.id);

            if (req.user.id === comment.userId || req.user.id === video.userId) {
                await Comment.findByIdAndDelete(req.params.id);
                res.status(200).json("The comment has been deleted!!")
            } else {
                next(createError(403, "You can delete only your comment!"))
            }

        } catch (err) {
            next(err);
        }
    }

    getComment = async (req, res, next) => {
        try {
            const comments= await Comment.find({videoId: req.params.videoId});
            res.status(200).json(comments)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new CommentController;