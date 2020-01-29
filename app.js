var express = require("express");
var bodyParser = require('body-parser');//body-parser中间件来解析请求体
var app = new express(); /*实例化*/
//保存用户信息
var session = require("express-session");
//配置中间件  固定格式
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30
    },
    rolling: true
  })
);

var cors = require('cors')   //引入cors模块之后，在终端用命令安装cors模块
//安装cors的命令   $ cnpm i cors -S

app.use( cors ({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
}) )
//引入模块
var admin = require("./routes/admin.js");

var index = require("./routes/index.js");

var apiv1 = require("./routes/apiv1.js");

//使用ejs模板引擎   默认找views这个目录
app.set("view engine", "ejs");

//配置public目录为我们的静态资源目录
app.use(express.static("public"));

app.use("/upload", express.static("upload"));

app.use("/", index);

app.use("/admin", admin);

app.use("/apiv1", apiv1);

app.listen(3004, "127.0.0.1");
