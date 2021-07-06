/*admin login router*/
const express = require("express")
const router = express.Router()
const adminLoginController = require("../../controllers/admin/adminLoginController")
// middlewares required
const adminSessionMw = require("../../middlewares/adminSessionCheck")

/* admin login sayfası route işlemleri */
router.get('/login', adminSessionMw.adminIsLoggedCheckMw, adminLoginController.adminLogin)

router.post('/login', adminSessionMw.adminIsLoggedCheckMw, adminLoginController.adminLoginSignin)

module.exports = router