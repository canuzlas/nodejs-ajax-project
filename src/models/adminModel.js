const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminLoginSchema = new Schema({
    admin_username:{type:String, min:8, trim:true},
    admin_password:{type:String, min:8, max:32, trim:true},
    admin_ad:{type:String, min:8, max:32, trim:true},
    admin_soyad:{type:String, min:8, max:32, trim:true},
    admin_email:{type:String, min:8, max:32, trim:true}
})

const adminLoginModel = mongoose.model("admin",adminLoginSchema)

module.exports = adminLoginModel