const { User } = require('../../model/user')
const bcrypt = require('bcrypt')
module.exports = async(req, res, next) => {
    // res.send('ok')
    //接收客户端传递过来的请求参数
    const { username, email, role, state, password } = req.body
        //即将要修改的用户id
    const id = req.query.id
        //res.send(body.password)
    let user = await User.findOne({ _id: id })
    const isvalid = await bcrypt.compare(password, user.password)
        //密码比对成功
    if (isvalid) {
        //将用户信息更新到数据库中
        await User.updateOne({ _id: id }, {
                username: username,
                email: email,
                role: role,
                state: state
            })
            //重定向到用户列表页面
        res.redirect('/admin/user')
    } else {
        //密码比对失败
        let obj = { path: '/admin/user-edit', message: '密码比对失败，不能进行用户信息修改', id: id }
            //写法1
        next(JSON.stringify(obj))
            //写法2
            // next(obj)
    }

}