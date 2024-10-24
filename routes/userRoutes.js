const express = require('express');
const router = express.Router();
const { User } = require('../db');
const { authenticateJwt } = require('../middleware/authenticateJwt');


router.get("/", authenticateJwt, async (req, res) => {
    const user = await User.findById(req.userId);
    if (user) {
        res.json({ userEmail: user.userEmail, savedCourseData: user.savedCourseData })
    } else {
        res.sendStatus(403);
    }
})
router.post("/save", authenticateJwt, async (req, res) => {
    if (!req.body.newSavedData) {
        res.status(401).json({ message: "No new data" });
        return;
    }
    const user = await User.findByIdAndUpdate(req.userId, { savedCourseData: req.body.newSavedData }, { new: true });
    if (user) {
        res.json({ message: 'Save Successful' });
    } else {
        res.status(404).json({ message: "Update failed" });
    }
})
router.get("/saved", authenticateJwt, async (req, res) => {
    const user = await User.findById(req.userId);
    if (user) {
        res.json({ savedCourseData: user.savedCourseData });
    } else {
        res.status(403).json({ message: 'User not logged in' });
    }
})

router.get("/favourites", authenticateJwt, async (req, res) => {
    let user = null;
    try {
        user = await User.findOne({ _id: req.userId });
    } catch (e) {
        console.log(e)
    }
    if (user) {
        res.json({ message: 'Favourites Retreived', favs: user.favourites });
    } else {
        res.status(404).json({ message: "Favourites Retrieve failed" });
    }
})

router.post("/favourites/save", authenticateJwt, async (req, res) => {
    if (!req.body.timetable) {
        res.status(401).json({ message: "No timetable data" });
        return;
    }
    const user = await User.updateOne({ _id: req.userId }, { $push: { favourites: req.body.timetable } });
    const updatedUser = await User.findOne({ _id: req.userId });

    // Get the ID of the newly added favorite object
    const newFavoriteId = updatedUser.favourites[updatedUser.favourites.length - 1]._id;

    if (user && updatedUser) {
        res.json({ message: 'Favourites Save Successful', id: newFavoriteId });
    } else {
        res.status(404).json({ message: "Favourites Save failed" });
    }
})
router.delete("/favourites/delete", authenticateJwt, async (req, res) => {
    if (!req.body.id) {
        res.status(401).json({ message: "No id to delete data" });
        return;
    }
    const user = await User.findByIdAndUpdate(
        req.userId,
        { $pull: { favourites: { _id: req.body.id } } },
        { new: true }
    );
    if (user) {
        res.json({ message: 'Favourites Delete Successful' });
    } else {
        res.status(404).json({ message: "Favourites Delete failed" });
    }
})

module.exports = router;