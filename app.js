const express = require("express")
const app = express()
const path = require("path")
const ejsLayout = require("express-ejs-layouts")
const dotenv = require("dotenv").config()
const session = require('express-session')
var MongoDBStore = require('connect-mongo')

/* mongodb bağlantısı */
require("./src/configs/mongoDBconnection")

/* routers requires */
const adminLoginRouter = require("./src/routers/admin/adminLoginRouter")
const adminManagementRouter = require("./src/routers/admin/adminManagementRouter")
const webRouter = require("./src/routers/web/webRouter")

/* app statics files */
app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.static(path.resolve(__dirname, "src/uploads")))

/* app set configs */
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "src/views"))

/* app uses */

// app sessions use
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    store: MongoDBStore.create({ mongoUrl: process.env.mongoDBurl, collection: 'sessions',
    ttl: 24 * 60 * 60 }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60 * 60 *24
    }
}))

//ejslayout use
app.use(ejsLayout)
// app form use
app.use(express.urlencoded({ extended: true }))
//routers use 
app.use("/",webRouter)
app.use("/admin/management", adminLoginRouter)
app.use("/admin/management/logged", adminManagementRouter)








app.listen(process.env.PORT || 3000, () => {
    console.log("dinlemede")
})