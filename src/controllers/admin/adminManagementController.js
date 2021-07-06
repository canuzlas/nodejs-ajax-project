/*admin login controller*/
const md5 = require("md5")

//adminLoginModel required
const adminModel = require("../../models/adminModel")

/* admin index sayfasına get isteği geldiğinde */
const adminShowIndexPage = async (req, res) => {
    return res.render("./admin/adminindex", { layout: 'layout/adminIndexLayout.ejs', title: 'Yönetim Anasayfa', admin:req.session.admin })
}
/* admin logput sayfasına get isteği geldiğinde */
const adminLogout = (req, res) => {
    delete req.session.admin
    return res.redirect("/admin/management/login")
}
/* admin profil sayfasını göster (get) */
const showAdminProfilePage = async (req, res) => {
    return res.render("./admin/adminProfile", { layout: 'layout/adminIndexLayout.ejs', title: 'Admin Profili',admin:req.session.admin })
}

/* admin profili güncelle */
const updateToAdminProfile = async (req, res) => {
    const sonuc = await adminModel.findById(req.session.admin._id)

    if (sonuc) {
        const updateAdmin = await adminModel.findByIdAndUpdate(req.session.admin._id, { admin_email: req.body.admin_email, admin_username: req.body.admin_username, admin_password: md5(req.body.admin_password) })
        if (updateAdmin) {
            const admin = await adminModel.findById(req.session.admin._id)
            req.session.admin = admin 
            return res.send({ status: true })
        } else {
            return res.send({ status: false })
        }
    } else {
        return res.send({ status: false })
    }
}



module.exports = {
    adminShowIndexPage,
    adminLogout,
    showAdminProfilePage,
    updateToAdminProfile
}
