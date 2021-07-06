const adminSessionCheckMw = (req,res,next)=>{
    if(req.session.admin){
        console.log("session check true")
        return next()
    }else{
        console.log("session check else")
        return res.redirect("/")
    }
}

const adminIsLoggedCheckMw = (req,res,next)=>{
    if(req.session.admin){
        return res.redirect("/admin/management/logged")
    }else{
        return next()
    }
}

module.exports = {
    adminSessionCheckMw,
    adminIsLoggedCheckMw
    
}