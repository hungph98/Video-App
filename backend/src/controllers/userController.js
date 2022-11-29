const User = require("../models/Users");
const createError = require("../../err");

class UserController {

    updateUser = async(req, res, next) => {
        if (req.params.id === req.user.id) {
            try {
                const updateUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: res.body
                },{ new: true});
                res.status(200).json(updateUser);
            } catch (err){
                next(err);
            }
        }
        return next(createError(403, "You can update only your account!!"))
    }

    deleteUser = async(req, res, next) => {
        if (req.params.id === req.user.id) {
            try {
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted!!");
            } catch (err){
                next(err);
            }
        }
        return next(createError(403, "You can delete only your account!!"))
    }

    getUser = async(req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user)
        } catch (err) {
            next(err);
        }
    }

    subscribeUser = async(req, res, next) => {
        try {
            await User.findByIdAndUpdate(req.params.id, {
                $push:{ subscribeUsers: req.params.id }
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribe: 1 }
            })
            res.status(200).json("Subscribe Successfully!!")
        } catch (err) {
            next(err);
        }
    }

    unsubscribeUser = async(req, res, next) => {
        try {
            await User.findById(req.params.id, {
                $pull:{ subscribeUsers: req.params.id }
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribe: -1 }
            })
            res.status(200).json("UnSubscribe Successfully!!")
        } catch (err) {
            next(err);
        }
    }

    likeUser = async(req, res, next) => {
        try {

        } catch (err) {
            next(err);
        }
    }

    dislikeUser = async(req, res, next) => {
        try {

        } catch (err) {
            next(err)
        }
    }
    
}

module.exports = new UserController;