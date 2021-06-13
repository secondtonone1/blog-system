//导入用户集合构造函数
const { User } = require('../../model/user')
    //引入bcrypt模块
const bcrypt = require('bcrypt')
const login = async(req, res) => {
    //接受请求参数
    const { email, password } = req.body
        //如果用户没有输入邮箱
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件地址或者邮箱密码错误' })
    }
    //根据邮箱地址查询用户信息
    //如果查询到用户user变量的值是对象类型
    //如果没有查询到用户user变量为空
    let user = await User.findOne({ email: email })

    if (user == null) {
        //没有查询到用户
        return res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
    }

    let isValid = await bcrypt.compare(password, user.password)
        //用户密码不正确
    if (!isValid) {
        return res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
    }

    //返回用户登录成功
    //将用户名存储在请求对象中
    req.session.username = user.username
    req.session.role = user.role
        //res.send('登录成功')
    req.app.locals.userInfo = user
        //对用户角色判断
    if (user.role == 'admin') {
        //重定向到用户管理列表
        res.redirect('/admin/user')
    } else {
        //跳转到博客园首页
        res.redirect('/home/')
    }


}

module.exports = login