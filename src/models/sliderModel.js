const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sliderSchema = new Schema({
    slider_baslik:{type:String, trim:true},
    slider_altaciklama:{type:String, trim:true},
    slider_resim:{type:String, trim:true},
    slider_more:{type:String, trim:true}
})

const sliderModel = mongoose.model("slider",sliderSchema)

module.exports = sliderModel