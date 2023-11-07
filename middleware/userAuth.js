function userAuth(req, res, next) {
    console.log('userAuth');
    next();
    // if (req.session.user) {
    // } else {
    //     res.redirect('/login');
    // }
}

module.exports = userAuth;