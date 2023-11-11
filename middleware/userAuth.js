function userAuth(req, res, next) {
    console.log('userAuth');
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = userAuth;