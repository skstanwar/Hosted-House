const IsAuth= (req, res, next)=>{
    if(req.session.IsAuth){
        next();

    }
    else{
        res.redirect('/register');
    }
}
const AntiAuth= (req, res, next)=>{
    if(req.session.IsAuth){
        res.redirect('/');
    }
    else{
        next();
    }
}
export {IsAuth, AntiAuth};
