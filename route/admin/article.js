//将文章集合的构造函数导入当前文件中
const { Article } = require('../../model/article')
    // 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page')
const config = require('config')

module.exports = async(req, res) => {
    //标识， 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article'

    try {
        //接受客户端传递过来的页码
        const page = req.query.page || 1
        const message = req.query.message
            //page 指定当前页面
            //size 指定每页显示条目
            //display 指定客户端要显示的页码数量
            //exec 向数据库中发送查询请求
            //查询所有文章数据
        let articles = await pagination(Article).find().page(page).size(config.get('page.size')).display(config.get('page.display')).populate('author').exec()
        console.log("articles are ", articles)
        let str = JSON.stringify(articles);
        let articles_json = JSON.parse(str)
            // res.send(articles)
            // console.log(articles)
            //渲染文章列表页面模板
        res.render('admin/article.art', {
            articles: articles_json,
            message: message
        })
    } catch (ex) {
        console.log(ex.message)
    }

}