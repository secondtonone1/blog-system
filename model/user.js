//创建用户集合
//引入mongoose第三方模块
const mongoose = require('mongoose')
    //导入bcrypt
const bcrypt = require('bcrypt')
const Joi = require('joi')
    //创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },

    email: {
        type: String,
        //保证邮箱地址在插入数据库时不重复
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    //admin 超级管理员
    //normal 普通用户
    role: {
        type: String,
        required: true
    },

    //0 启用状态
    //1 禁用状态
    state: {
        type: Number,
        default: 0
    }
})

//创建集合
const User = mongoose.model('User', userSchema)

async function createUser() {
    const salt = await bcrypt.genSalt(10)
    const passwd = await bcrypt.hash('123456', salt)
    const user = await User.create({
        username: 'secondtonone1',
        email: 'secondtonone1@163.com',
        password: passwd,
        role: 'admin',
        state: 0
    })
}

//createUser()

//验证用户信息
//定义对象的验证规则
const validateUser = (user) => {
    const schema = {
            username: Joi.string().min(2).max(15).required().error(new Error('用户名不符合规则')),
            email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合')),
            role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
            state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
        }
        //实验验证
    return Joi.validate(user, schema)

}


//将用户集合作为模块成员进行导出
module.exports = {
    User,
    validateUser
}