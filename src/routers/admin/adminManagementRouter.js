/*admin mangament router*/
const express = require("express")
const router = express.Router()

/* multer required */
const multer = require("../../configs/multer")

// controllers required
const adminManagementController = require("../../controllers/admin/adminManagementController")
// middlewares required
const adminSessionMw = require("../../middlewares/adminSessionCheck")

/* admin login sayfası route işlemleri */
router.get('/', adminSessionMw.adminSessionCheckMw, adminManagementController.adminShowIndexPage)
/* admin çıkış isteği */
router.get('/logout', adminSessionMw.adminSessionCheckMw, adminManagementController.adminLogout)
/* admin profil get isteği */
router.get('/adminprofile', adminSessionMw.adminSessionCheckMw, adminManagementController.showAdminProfilePage)
/* sliders get isteği */
router.get('/sliders', adminSessionMw.adminSessionCheckMw, adminManagementController.showSliders)


/* admin profil post */
router.post('/updateadminprofile', adminSessionMw.adminSessionCheckMw, adminManagementController.updateToAdminProfile)
/* addslider post */
router.post('/addslider', adminSessionMw.adminSessionCheckMw, multer.sliderMulter.single("slider_resim"), adminManagementController.addSlider)
/* deleteslider get isteği */
router.post('/deleteslider', adminSessionMw.adminSessionCheckMw, adminManagementController.deleteSlider)


module.exports = router