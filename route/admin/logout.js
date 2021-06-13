module.exports = (req, res) => {
    //删除session
    req.session.destroy(function() {
        //删除cookie
        res.clearCookie('connect.sid')
            //重定向到用户登录界面
        res.redirect('/admin/login')
            //清楚模板中用户的信息
        req.app.locals.userInfo = null
    })
}