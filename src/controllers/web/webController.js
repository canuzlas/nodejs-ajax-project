const showIndexPage = (req,res)=>{
    res.render("./web/index.ejs", { layout: 'layout/webLayout.ejs',title:"Title" })
}

module.exports = {
    showIndexPage
}