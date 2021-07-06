/*admin mangament router*/
const express = require("express")
const router = express.Router()

const adminManagementController = require("../../controllers/admin/adminManagementController")
// middlewares required
const adminSessionMw = require("../../middlewares/adminSessionCheck")

/* admin login sayfası route işlemleri */
router.get('/', adminSessionMw.adminSessionCheckMw, adminManagementController.adminShowIndexPage)
/* admin çıkış isteği */
router.get('/logout', adminSessionMw.adminSessionCheckMw, adminManagementController.adminLogout)
/* admin profil get isteği */
router.get('/adminprofile', adminSessionMw.adminSessionCheckMw, adminManagementController.showAdminProfilePage)

/* admin profil post */
router.post('/updateadminprofile', adminSessionMw.adminSessionCheckMw, adminManagementController.updateToAdminProfile)



module.exports = router