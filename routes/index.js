const express = require('express');
const router = express.Router();
const path = require('path');

// import api routes for /api/notes
const apiRoutes = require("./api");
router.use("/api/notes", apiRoutes);

// get /notes returning html
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
});

// get * returning html
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

module.exports = router;