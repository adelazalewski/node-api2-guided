const express = require("express");
const router = express.Router();
router.use('/', (req, res) => {
    res.json({
		message: "Welcome to our API",
	})
})
module.exports = router;