/*admin login controller*/


/* admin login sayfasına get isteği geldiğinde */
const adminLogin = (req,res)=>{
    res.render("./admin/index",{layout:'layout/indexLayout.ejs'})
}

module.exports = {
    adminLogin
}