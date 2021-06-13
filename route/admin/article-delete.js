const { Article } = require('../../model/article')
    // 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page')
const config = require('config')
let article_delete = async(req, res) => {
    try {
        // console.log(req.query.id)
        // res.send(req.query.id)
        let result = await Article.findOneAndDelete({ _id: req.query.id })
        console.log(result)
            //res.redirect('/admin/article')

        //接受客户端传递过来的页码
        let page = req.query.page || 1
            //page 指定当前页面
            //size 指定每页显示条目
            //display 指定客户端要显示的页码数量
            //exec 向数据库中发送查询请求
            //查询所有文章数据
        let articles = await pagination(Article).find().page(page).size(config.get('page.size')).display(config.get('page.display')).populate('author').exec()
        if (page > articles.pages) {
            page = articles.pages || 1
            articles = await pagination(Article).find().page(page).size(config.get('page.size')).display(config.get('page.display')).populate('author').exec()
        }
        let str = JSON.stringify(articles);
        let articles_json = JSON.parse(str)
            // res.send(articles)
            // console.log(articles)
            //渲染文章列表页面模板
        res.render('admin/article', {
            articles: articles_json
        })

    } catch (ex) {
        console.log('except is ', ex)
        res.redirect('/admin/article', { message: ex.message })
    }
}

module.exports = article_delete