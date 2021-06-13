//引入mongoose第三方模块
const mongoose = require('mongoose')
    //创建文章集合规则
const commentSchema = new mongoose.Schema({
    //aid 文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },

    //评论人id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    //评论时间
    time: {
        type: Date
    },

    //评论内容
    content: {
        type: String
    }
})

//3  根据规则创建集合
const Comment = mongoose.model('Comment', commentSchema)

//4 将集合规则作为模块成员导出
module.exports = {
    Comment: Comment
}