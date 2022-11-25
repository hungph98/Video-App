const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Update user
router.put("/update/:id", userController.updateUser);

// Delete user
router.delete("/:id", userController.deleteUser);

// Get a user
router.get("/find/:id", userController.getUser);

// Subscribe a user
router.put("/sub/:id", userController.subscribeUser);

// Unsubscribe a user
router.put("/unsub/:id", userController.unsubscribeUser);

// Like a video
router.put("/like/:videoId", userController.likeUser);

// Disliek a video
router.put("/dislike/:videlId", userController.dislikeUser);

module.exports = router;