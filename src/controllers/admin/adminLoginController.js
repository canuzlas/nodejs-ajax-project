/*admin login controller*/

//adminLoginModel required
const adminModel = require("../../models/adminModel")


/* admin login sayfasına get isteği geldiğinde */
const adminLogin = (req, res) => {
    res.render("./admin/adminLogin", { layout: 'layout/adminLoginLayout.ejs',title:"Admin Giriş" })
}
/* admin login sayfasına post isteği geldiğinde */
const adminLoginSignin = async (req, res) => {

   const admin = await adminModel.find({admin_username:req.body.admin_username,admin_password:req.body.admin_password})

   if(admin.length){
       req.session.admin = admin[0]
       res.redirect("/admin/management/indexpage")
   }else{
       return res.send({response:false})
   }
}

/* admin index sayfasına get isteği geldiğinde */
const adminShowIndexPage = async (req, res) => {
    console.log(req.session.admin)
 }


module.exports = {
    adminLogin,
    adminLoginSignin,
    adminShowIndexPage
}