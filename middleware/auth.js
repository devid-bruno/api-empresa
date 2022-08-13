function auth(req, res, next){
    if(req.session.admin != undefined){
        next();
    }else{
        res.redirect("/adminAuth");
    }
}


export default auth;