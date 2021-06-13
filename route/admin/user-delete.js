const { User } = require('../../model/user')
const bcrypt = require('bcrypt')
module.exports = async(req, res, next) => {
    // res.send('ok')
    //res.send(req.query.id)
    //根据id删除用户
    try {
        await User.findOneAndDelete({ _id: req.query.id })
            //将页面重定向到用户列表页面
        res.redirect('/admin/user')
    } catch (ex) {

    }

}