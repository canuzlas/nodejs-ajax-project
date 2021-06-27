const adminSessionCheckMw = (req,res,next)=>{
    if(req.session.admin){
        console.log("session check true")
        return next()
    }else{
        console.log("session check else")
        return res.redirect("/")
    }
}

module.exports = {
    adminSessionCheckMw
}