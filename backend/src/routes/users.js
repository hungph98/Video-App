const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../../verifyToken")

const router = express.Router();

// Update user
router.put("/update/:id", verifyToken, userController.updateUser);
// Delete user
router.delete("/:id", verifyToken, userController.deleteUser);
// Get a user
router.get("/find/:id", userController.getUser);
// Subscribe a user
router.put("/sub/:id", verifyToken, userController.subscribeUser);
// Unsubscribe a user
router.put("/unsub/:id", verifyToken, userController.unsubscribeUser);
// Like a video
router.put("/like/:videoId", verifyToken, userController.likeUser);
// Disliek a video
router.put("/dislike/:videlId", verifyToken, userController.dislikeUser);

module.exports = router;