const { User } = require('../../model/user')
const fs = require('fs')
    //引入formidable 第三方模块
const formidable = require('formidable')
const path = require('path')
const { Article } = require('../../model/article')
module.exports = async(req, res, next) => {
    //1  创建表单解析对象
    const form = new formidable.IncomingForm()
        //2  配置文件上传目录
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
        //3 保留上传文件的后缀
    form.keepExtensions = true;
    //4  解析表单
    form.parse(req, async(err, fields, files) => {
            try {

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


                //1 err 是错误对象 如果表单解析失败， err里面存储错误信息
                //如果表单解析成功， err将会为空
                //2 fields 对象类型 保存普通表单数据
                //3 files 对象类型 保存了和上传文件相关数据
                //res.send(fields)  
                //console.log(fields)
                // res.send(files)

                let user_find = await User.findOne({ username: fields.author })
                console.log(user_find)
                if (user_find == null) {
                    const errmsg = "user " + fields.author + "not found"
                    console.log(errmsg)
                    next(JSON.stringify({ path: '/admin/article-add', message: errmsg }))
                    return
                }
                await Article.create({
                    title: fields.title,
                    author: user_find._id,
                    publishData: fields.publishData,
                    cover: files.cover.path.split('public')[1],
                    content: fields.content,
                })
                res.redirect('/admin/article')
            } catch (ex) {
                console.log(ex.message)
                    //密码比对失败
                res.redirect('/admin/article', { message: ex.message })
            }

        })
        // res.send('ok')
}