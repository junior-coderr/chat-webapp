function destroySession(req,res,next){
if(req.session.user){
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.status(400).json({err:'Something went wrong!',status: false});
        }else{
            next();
        }
    })
}else{
    next();
}
}

module.exports = destroySession;