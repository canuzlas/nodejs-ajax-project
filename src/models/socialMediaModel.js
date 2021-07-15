const mongoose = require("mongoose")
const Schema = mongoose.Schema

const socialMediaSchema = new Schema({
    socialmedia:{type:String, trim:true},
    socialmedia_link:{type:String, trim:true}
})

const socialMediaModel = mongoose.model("social",socialMediaSchema)

module.exports = socialMediaModel