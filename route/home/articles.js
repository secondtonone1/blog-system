const { Article } = require("../../model/article")
const { Comment } = require("../../model/comment")

module.exports = async(req, res) => {
    const id = req.query.id
        //res.send('欢迎来到文章详情页')

    //查询文章信息
    let article = await Article.findOne({ _id: id }).populate('author').lean()
        //console.log(article)
        //console.log('欢迎来到文章详情页')

    //查询评论信息
    let comments = await Comment.find({ aid: id }).populate('uid').sort({ 'time': -1 }).lean()

    res.render('home/article', { article: article, comments: comments })
}