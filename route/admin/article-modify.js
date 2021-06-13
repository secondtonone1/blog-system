const { User } = require('../../model/user')
const { Article } = require('../../model/article')
const fs = require('fs')
    //引入formidable 第三方模块
const formidable = require('formidable')
const path = require('path')
module.exports = async(req, res, next) => {
    //1  创建表单解析对象
    const form = new formidable.IncomingForm()
        //2  配置文件上传目录
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
        //3 保留上传文件的后缀
    form.keepExtensions = true;
    //4  解析表单
    //即将要修改的用户id
    const article_id = req.query.id
    try {
        let article_data = await Article.findOne({ _id: article_id })
        if (article_data == null) {
            res.render('/admin/article', { message: "未找到文章" })
            return
        }
        //console.log("article cover is ", article_data.cover)
        //console.log(article_data.cover.split('\\'))
        //切割获取文件名
        let article_arry = article_data.cover.split('\\')
            //删除旧文件
        if (article_arry.length > 0) {
            let article_fix = article_arry[article_arry.length - 1]
            let old_path = path.join(__dirname, '../', '../', 'public', 'uploads', article_fix)
            fs.unlink(old_path, function(err) {
                if (err) {
                    console.log("删除缓存文件失败")
                } else {
                    console.log('删除文件 ', old_path, ' 成功')
                }
            })
        }
        //更新文章
        form.parse(req, async(err, fields, files) => {
            if (files.cover.size == 0) {
                //判断图片文件为空，删除暂存文件
                fs.unlink(files.cover.path, function(err) {
                    if (err) {
                        console.log("删除缓存文件失败")
                    } else {
                        console.log('删除文件 ', files.cover.path, ' 成功')
                    }
                })
            }

            await Article.updateOne({ _id: article_id }, {
                title: fields.title,
                author: article_data.author,
                publishData: fields.publishData,
                cover: files.cover.path.split('public')[1],
                content: fields.content,
            })
            res.redirect('/admin/article')
        })

    } catch (ex) {
        console.log(ex.message)
            //密码比对失败
        res.redirect('/admin/article', { message: ex.message })
    }
}