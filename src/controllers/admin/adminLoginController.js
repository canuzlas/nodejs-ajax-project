/*admin login controller*/
const md5 = require("md5")

//adminLoginModel required
const adminModel = require("../../models/adminModel")


/* admin login sayfasına get isteği geldiğinde */
const adminLogin = (req, res) => {
    res.render("./admin/adminLogin", { layout: 'layout/adminLoginLayout.ejs',title:"Admin Giriş" })
}

/* admin login sayfasına post isteği geldiğinde */
const adminLoginSignin = async (req, res) => {

   const admin = await adminModel.find({admin_username:req.body.admin_username,admin_password:md5(req.body.admin_password)})
   if(admin.length){
       req.session.admin = admin[0]
       return res.send({response:true})
   }else{
       return res.send({response:false})
   }
}


module.exports = {
    adminLogin,
    adminLoginSignin
}