const mongoose = require("mongoose");

const Video = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    views: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    dislikes: {
        type: [],
        default: [],
    }
    
},{ timestamps: true });

module.exports =  mongoose.model("Video", Video);