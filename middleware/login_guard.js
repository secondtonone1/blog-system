const guard = (req, res, next) => {
    //判断用户访问的是否为登录界面
    //判断用户的登录状态
    //如果用户是登录的，将请求放行
    //如果用户不是登录的， 将请求重定向到登录页面

    //是登录界面，则将请求路由下去
    if (req.url == '/login') {
        next()
        return
    }
    //会话存在,说明登陆了
    //用户是登录状态，将请求放行
    if (req.session.username) {
        //如果是超级管理员，则继续向下路由
        if (req.session.role == 'admin') {
            next()
            return
        }

        //如果是普通用户,则直接渲染博客首页
        if (req.session.role == 'normal') {
            return res.redirect('/home')
        }

    }

    res.redirect('/admin/login')
}

module.exports = guard