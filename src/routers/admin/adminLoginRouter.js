/*admin login router*/
const express = require("express")
const router = express.Router()
const adminLoginController = require("../../controllers/admin/adminLoginController")
// middlewares required
const adminSessionMw = require("../../middlewares/adminSessionCheck")

/* admin login sayfası route işlemleri */
router.get('/login', adminLoginController.adminLogin)
router.get('/indexpage', adminSessionMw.adminSessionCheckMw, adminLoginController.adminShowIndexPage)



router.post('/login', adminLoginController.adminLoginSignin)

module.exports = router