/*admin mangament router*/
const express = require("express")
const router = express.Router()

// controllers required
const webController = require("../../controllers/web/webController")

router.get("/",webController.showIndexPage)


module.exports = router