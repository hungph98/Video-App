const Video = require("../models/Video");
const createError = require("../../err");
const User = require("../models/Users");

class VideoController{

    createVideo = async (req, res, next) => {
        const newVideo = new Video({userId: req.user.id, ...req.body});
        try {
            const saveVideo = await newVideo.save();
            res.status(200).json(saveVideo)
        } catch (err) {
            next(err)
        }
    }

    updateVideo = async (req, res, next) => {
        try {
            const video = await Video.findById(req.params.id);
            if (!video) {
                next(createError(400, "Video not found!"));
            }

            if (req.user.id === video.userId) {
                const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
                    $set: res.body
                }, {new: true});
                res.status(200).json(updateVideo);
            } else {
                next(createError(403, "You can update only your video!"));
            }
        } catch (err){
            next(err);
        }
    }

    deleteVideo = async (req, res, next) => {
        try {
            const video = await Video.findById(req.params.id);
            if (!video) {
                next(createError(400, "Video not found!!"));
            }

            if (req.user.id === video.userId) {
                await Video.findByIdAndDelete(req.params.id);
                res.status(200).json("Delete video successfully!!")
            }else {
                next(createError(403, "You can delete only your video!"));
            }
        } catch (err) {
            next(err);
        }
    }

    getVideo = async (req, res, next) => {
        try {
            const video = await Video.findById(req.params.id);
            res.status(200).json(video);
        } catch (err) {
            next(err)
        }
    }

    addView = async (res, req, next) => {
        try {
            await Video.findByIdAndUpdate(req.params.id, {
                $inc: {views: 1}
            })
            res.status(200).json("The view has been increased!!")
        } catch (err) {
            next(err);
        }
    }

    randomVideo = async (req, res, next) => {
        try {
            const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
            res.status(200).json(videos)
        } catch (err) {
            next(err)
        }
    }

    trendVideo = async (req, res, next) => {
        try {
            const videos = await Video.find().sort({ views: -1})
            res.status(200).json(videos);
        } catch (err) {
            next(err)
        }
    }

    subscribeVideo = async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);
            const subscribedChannels = user.subscribedUsers;

            const list = await Promise.all(
                subscribedChannels.map(channelId => {
                    return Video.find({ userId: channelId })
                })
            )
            res.status(200).json(list.flat().sort((a,b) => b.createdAt - a.createdAt));
        } catch (err) {
            next(err)
        }
    }

    getByTag = async (req, res, next) => {
        const tags = req.query.tags.split(",");
        try {
            const videos = await Video.find({tags: {$in: tags}}).limit(20);
            res.status(200).json(videos);
        } catch (err) {
            next(err);
        }

    }

    search = async (req, res, next) =>{
        const query = req.query.search;
        try {
            const videos = await Video.find({title: {$regex: query, $options: "i"} }).limit(40);
            res.status(200).json(videos);
        } catch (err) {
            next(err);
        }
    }

}
module.exports = new VideoController;