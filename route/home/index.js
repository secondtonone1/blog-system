const { Article } = require('../../model/article')
const { User } = require('../../model/user')
const config = require('config')
    //导入分页模块
const pagination = require('mongoose-sex-page')
module.exports = async(req, res) => {
    let page = req.query.page || 1
        //  res.send('欢迎来到博客首页')
        // let result = await Article.find().populate('author')
    let result = await pagination(Article).page(page).size(4).display(4).find().populate('author').exec()
        //res.send(result)
    let str = JSON.stringify(result);
    let result_index = JSON.parse(str)
        //console.log(result_index)

    for (let i = 0; i < result_index.records.length; i++) {
        let brief = result_index.records[i].content.replace(/<[^>]+>/g, '').substr(0, 90) + '...'
        result_index.records[i].brief = brief
        console.log(result_index.records[i].brief)
    }
    var txt = str.replace(/microsoft/i, "Runoob");
    res.render('home/default', { result: result_index })
}