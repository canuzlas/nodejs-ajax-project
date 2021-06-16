const express = require("express")
const app = express()
const path = require("path")
const ejsLayout = require("express-ejs-layouts")

/* routers */
const adminLoginRouter = require("./src/routers/admin/adminLoginRouter")

/* app set configs */
app.set("view engine","ejs")
app.set("views",path.resolve(__dirname,"src/views"))

/* app uses */

//ejslayout use
app.use(ejsLayout)


//routers use 
app.use("/admin/management",adminLoginRouter)






app.listen(3000,()=>{
    console.log("dinlemede")
})