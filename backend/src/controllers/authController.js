const mongoose = require("mongoose")
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const createError = require("../../err");
const jwt = require('jsonwebtoken');

class AuthController {

    // Register
    register = async (req, res, next) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({...req.body, password: hashPassword });

            await newUser.save();
            res.status(200).send("User has been created!")
        } catch(err) {
            next(err)
        }
    }

    // Login
    login = async (req, res, next) => {
        try {
            const user = await User.findOne({
                name: req.body.name
            });
            if(!user) {
                return next(createError(404, "User not found"));
            }

            const isCorrect = await bcrypt.compare(req.body.password, user.password);
            if(!isCorrect) {
                return next(createError(400, "Wrong Credentials"));

            }

            const token = jwt.sign({id:user._id}, process.env.JWT);
            const { password, ...others} = user._doc;

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json({detail: {...others}, token});
        } catch(err) {
            next(err)
        }
    }
}

module.exports = new AuthController;