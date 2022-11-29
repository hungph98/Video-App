const express = require("express");
const commentController = require("../controllers/commentController")
const verifyToken = require("../../err");

const router = express.Router();

router.post("/addComment", verifyToken, commentController.addComment);
router.delete("/:id", verifyToken, commentController.deleteComment);
router.get("/:videoId", commentController.getComment);

module.exports = router;