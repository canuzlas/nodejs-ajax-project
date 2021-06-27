const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminLoginSchema = new Schema({
    admin_username:{type:String, min:8},
    admin_password:{type:String, min:8, max:32}
})

const adminLoginModel = mongoose.model("admin",adminLoginSchema)

module.exports = adminLoginModel