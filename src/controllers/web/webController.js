/* required to social medias model */
const socialMediaModel = require("../../models/socialMediaModel")

/* required to slider model */
const sliderModel = require("../../models/sliderModel")


const showIndexPage = async(req,res)=>{
    const socials = await socialMediaModel.find()
    const sliders = await sliderModel.find()
    res.render("./web/index.ejs", { layout: 'layout/webLayout.ejs',title:"Title",socials:socials,sliders:sliders })
}

module.exports = {
    showIndexPage
}