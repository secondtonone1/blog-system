//引用express框架
const express = require('express')
    //创建博客展示页路由
const home = express.Router()
    //博客前台首页的展示页面
home.get('/', require('./home/index'))
    // 博客前台文章详情展示页面
    //home.get('/article', require('./home/article'));
    //将路由对象作为模块成员导出
home.get('/article', require('./home/articles'))
    // 实现文章评论提交
home.post('/comment', require('./home/comment'))
module.exports = home