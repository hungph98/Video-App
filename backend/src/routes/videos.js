const express = require("express");
const verifyToken = require("../../verifyToken");
const videoController = require("../controllers/videoController");

const router = express.Router();

router.post("/create", verifyToken, videoController.createVideo);
router.put("/update/:id", verifyToken, videoController.updateVideo);
router.delete("/:id", verifyToken, videoController.deleteVideo);
router.get("/find/:id", videoController.getVideo);
router.put("/view/:id", videoController.addView);
router.get("/random", videoController.randomVideo);
router.get("/trend", videoController.trendVideo);
router.get("/subscribe", verifyToken, videoController.subscribeVideo);
router.get("/tags", verifyToken, videoController.getByTag);
router.get("/search", verifyToken, videoController.search);

module.exports = router;