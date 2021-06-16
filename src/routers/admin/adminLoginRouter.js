/*admin login router*/
const express = require("express")
const router = express.Router()
const adminLoginController = require("../../controllers/admin/adminLoginController")

/* admin login sayfası route işlemi */
router.get('/login',adminLoginController.adminLogin)

module.exports = router