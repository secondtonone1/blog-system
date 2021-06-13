const { Article } = require('../../model/article')
const { User } = require('../../model/user')
const { Comment } = require('../../model/comment')
const config = require('config')
    //导入分页模块
const pagination = require('mongoose-sex-page')
module.exports = async(req, res) => {
    // res.send('ok')
    //res.send(req.body)
    //接收客户端请求的参数
    const { content, uid, aid } = req.body
        //将评论写入数据库
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    })

    res.redirect('/home/article?id=' + aid)
}