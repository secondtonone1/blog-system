//引用express框架
const express = require('express')
    //引入express-session框架
const session = require('express-session')
    //导入art-template模板引擎
const template = require('art-template')
    //导入dataformat 第三方模块
const dateFormat = require('dateformat')
    //创建网站服务器
const app = express()
    //处理路径
const path = require('path')
    //数据库连接
require('./model/connect')
const morgan = require('morgan')
const config = require('config')
    // require('./model/user')

//引入body-parser模块  用来处理post请求参数
const bodyParser = require('body-parser')
    //处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }))
    //配置session
app.use(session({
        secret: 'secret key',
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    }))
    //告诉express框架模板所在位置
app.set('views', path.join(__dirname, 'views'))
    //告诉express框架模板的默认后缀
app.set('view engine', 'art')
    //当渲染后缀为art模板时，所使用的模板引请时什么
app.engine('art', require('express-art-template'))

//向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat

//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))
    //拦截请求， 判断用户登录状态
app.use('/admin', require('./middleware/login_guard'))
    // console.log(config.get('title'))
console.log('node env is ', process.env.NODE_ENV)
    //获取系统环境变量， 返回值是对象
if (process.env.NODE_ENV.trim() == 'production') {
    //当前是生产环境
    console.log('当前是生产环境')
} else {
    //当前是开发环境
    console.log('当前是开发环境')
    app.use(morgan('dev'))
}

const home = require('./route/home')
const admin = require('./route/admin')
    //为路由匹配请求路径
app.use('/home', home)
app.use('/admin', admin)

app.use((err, req, res, next) => {
    //写法1
    //反序列化， 将字符串转化为对象类型
    //JSON.parse()
    const result = JSON.parse(err)
    let params = []
    for (let attr in result) {
        if (attr == 'path') {
            continue
        }
        params.push(attr + '=' + result[attr])
    }

    res.redirect(`${result.path}?${params.join('&')}`)

    //写法2
    // let params = []
    // for (let attr in err) {
    //     if (attr == 'path') {
    //         continue
    //     }
    //     params.push(attr + '=' + err[attr])
    // }

    // res.redirect(`${err.path}?${params.join('&')}`)

})

//监听端口
app.listen(8080)
console.log('网站服务器启动成功， 请访问localhost')