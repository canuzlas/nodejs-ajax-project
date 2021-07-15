/*admin login controller*/
const md5 = require("md5")
const fs = require("fs")
const path = require("path")
const resizeImg = require('resize-img')
const nodemailer = require('nodemailer')


//adminLoginModel required
const adminModel = require("../../models/adminModel")
//slider Model required
const sliderModel = require("../../models/sliderModel")
//socialmedia model required
const socialMediaModel = require("../../models/socialMediaModel")

/* admin index sayfasına get isteği geldiğinde */
const adminShowIndexPage = async (req, res) => {
    return res.render("./admin/adminindex", { layout: 'layout/adminIndexLayout.ejs', title: 'Yönetim Anasayfa', admin: req.session.admin })
}
/* admin logput sayfasına get isteği geldiğinde */
const adminLogout = (req, res) => {
    delete req.session.admin
    return res.redirect("/admin/management/login")
}
/* admin profil sayfasını göster (get) */
const showAdminProfilePage = async (req, res) => {
    return res.render("./admin/adminProfile", { layout: 'layout/adminIndexLayout.ejs', title: 'Admin Profili', admin: req.session.admin })
}
/* admin profili güncelle */
const updateToAdminProfile = async (req, res) => {
    const sonuc = await adminModel.findById(req.session.admin._id,(err,doc)=>{if(err) return res.send({ status: false })})
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
/* sliderları göster */
const showSliders = async (req, res) => {
    const sliders = await sliderModel.find()
    return res.render("./admin/sliderAdmin", { layout: 'layout/adminIndexLayout.ejs', title: 'Slider Ayarları', sliders: sliders, admin: req.session.admin })
}
/* slider ekle */
const addSlider = async (req, res) => {
    const slider = await new sliderModel({
        slider_baslik: req.body.slider_baslik,
        slider_altaciklama: req.body.slider_altaciklama,
        slider_resim: req.file.filename,
        slider_more: req.body.slider_more
    })
    const sonuc = await slider.save()
    if (sonuc) {
        const image = await resizeImg(fs.readFileSync(path.resolve(__dirname, "../../uploads/web/sliders/"+req.file.filename)), {
            width: 1680,
            height: 850
        });
        fs.writeFileSync(path.resolve(__dirname, "../../uploads/web/sliders/"+req.file.filename),image);
        return res.redirect("/admin/management/logged/sliders?success=" + "true")
    } else {
        return res.redirect("/admin/management/logged/sliders?success=" + "false")
    }
}
/* slider sil */
const deleteSlider = async (req, res) => {
    const sliderID = req.body.id
    const sonuc = await sliderModel.findByIdAndDelete(sliderID)
    if (sonuc) {
        fs.unlink(path.resolve(__dirname, '../../uploads/web/sliders') + '/' + sonuc.slider_resim, err => {
            if (err) {
                console.log('resim silinemedi');
            }
        });
        return res.send({ status: true })
    } else {
        return res.send({ status: false })
    }
}
/* show one slider page */
const showUpdateSliderPage = async (req, res) => {
    const sliderID = req.params.sliderid
    const slider = await sliderModel.findById(sliderID, (err, doc) => { if (err) return res.redirect("/admin/management/logged/sliders?status=" + "notfind") })
    if (slider) {
        return res.render("./admin/showOneSlider", { layout: "layout/adminIndexLayout.ejs", title: 'Slider Güncelleme', slider: slider, admin: req.session.admin })
    } else {
        return res.redirect("/admin/management/logged/sliders?status=" + "notfind")
    }
}
/* slider update */
const updateSlider = async (req, res) => {

    const sliderID = req.params.sliderid
    const slider = await sliderModel.findById(sliderID, (err, doc) => { if (err) return res.redirect("/admin/management/logged/sliders?status=" + "notfind") })
    if (req.file) {
        const sonuc = await sliderModel.findByIdAndUpdate(sliderID,
            {
                slider_baslik: req.body.slider_baslik,
                slider_altaciklama: req.body.slider_altaciklama,
                slider_resim: req.file.filename,
                slider_more: req.body.slider_more
            })

        if (sonuc) {
            fs.unlink(path.resolve(__dirname, '../../uploads/web/sliders') + '/' + slider.slider_resim, err => {
                if (err) {
                    console.log('hata');
                }
            });
            const image = await resizeImg(fs.readFileSync(path.resolve(__dirname, "../../uploads/web/sliders/"+req.file.filename)), {
                width: 1680,
                height: 850
            });
            fs.writeFileSync(path.resolve(__dirname, "../../uploads/web/sliders/"+req.file.filename),image);
            return res.redirect("/admin/management/logged/updateslider/" + sliderID + "?update=" + "true")
        } else {
            return res.redirect("/admin/management/logged/updateslider/" + sliderID + "?update=" + "false")
        }
    } else {

        const sonuc = await sliderModel.findByIdAndUpdate(sliderID,
            {
                slider_baslik: req.body.slider_baslik,
                slider_altaciklama: req.body.slider_altaciklama,
                slider_more: req.body.slider_more
            })
        if (sonuc) {
            return res.redirect("/admin/management/logged/updateslider/" + sliderID + "?update=" + "true")
        } else {
            return res.redirect("/admin/management/logged/updateslider/" + sliderID + "?update=" + "false")
        }

    }
}
/* sosyal medya hesapları tablosu */
const showSocialMediaTable = async (req, res) => {
    const socials = await socialMediaModel.find()
    return res.render("./admin/adminsocialmedia", { layout: 'layout/adminIndexLayout.ejs', socials: socials, title: 'Sosyal Medya Hesapları', admin: req.session.admin })
}
/* social media göster bir tane */
const showOneSocialMedia = async (req, res) => {
    const socialID = req.params.socialid
    const social = await socialMediaModel.findById(socialID, (err, doc) => { if (err) return res.redirect("/admin/management/logged/socialmedia?social_status=" + "notfind") })
    if(social){
        return res.render("./admin/showOneSocialMedia.ejs",{ layout: 'layout/adminIndexLayout.ejs', social:social, title: 'Sosyal Medya Güncelle', admin: req.session.admin })
    }else{
        return res.redirect("/admin/management/logged/socials?social_status=" + "notfind")
    }
}
/* social güncelle */
const updateSocial = async (req,res)=>{
    const socialID = req.body.id
    const sonuc = await socialMediaModel.findByIdAndUpdate(socialID,{socialmedia_link:req.body.socialmedia_link},(err,doc)=>{if(err) return res.send({status:false})})
    if(sonuc){
        return res.send({status:true})
    }else{
        return res.send({status:false})
    }
}
/* Admin Şifre Sıfırlama */
const forgetMyPass = async (req,res)=>{
    const email = req.body.email
    
    const adminfind = await adminModel.findOne({admin_email:email},(err,doc)=>{if(err)return res.send({status:false})})
    if(adminfind){

        const securitynumber = Math.floor(Math.random() * 999999) + 1
        req.session.adminforgetpass = securitynumber
        req.session.adminforgetpassmail = email
        const transporter = nodemailer.createTransport({
            host: 'mail.uzlasyazilim.com',
            port: 465,
            secure: true,
            auth: {
                user: 'contact@uzlasyazilim.com',
                pass: 's2ciyuzl4s'
            },
            tls: {
                rejectUnauthorized: false
              }
        });
        
        const sendmail = await transporter.sendMail({
            from: 'contact@uzlasyazilim.com',
            to: 'contact@uzlasyazilim.com',
            subject: 'Şifre Sıfırlama',
            text: 'Lütfen gelen sayıyı karşınıza çıkan ekrana girininz. Sayı: '+securitynumber
        });

        if(sendmail){
            return res.send({status:true})
        }else{
            return res.send({status:false})
        }

    }else{
        return res.send({status:false})
    }
}
/* code verify */
const verifyCode = async (req,res)=>{
    postedcode = req.body.code
    orgcode = req.session.adminforgetpass

    if(postedcode == orgcode){
        res.send({status:true})
    }else{
        res.send({status:false})
    }
}

const updatePassAdmin = async (req,res)=>{
    pass = req.body.password
    const sonuc = await adminModel.findOneAndUpdate({admin_email:req.session.adminforgetpassmail},{admin_password:md5(pass)},(err,doc)=>{if(err) return res.send({status:false})})
    if(sonuc){
        res.send({status:true})
    }else{
        res.send({status:false})
    }
}






module.exports = {
    adminShowIndexPage,
    adminLogout,
    showAdminProfilePage,
    updateToAdminProfile,
    showSliders,
    addSlider,
    deleteSlider,
    showUpdateSliderPage,
    updateSlider,
    showSocialMediaTable,
    showOneSocialMedia,
    updateSocial,
    forgetMyPass,
    verifyCode,
    updatePassAdmin
}
