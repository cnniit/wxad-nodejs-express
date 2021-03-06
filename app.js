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

var apiv1 = require("./routes/apiv1.js");

//配置public目录为我们的静态资源目录
app.use(express.static("public"));
app.use(express.static("gen-js"));
app.use('/apidoc',express.static("apidoc"));//apidoc -i routes -o apidoc

app.use("/upload", express.static("upload"));

app.use("/admin", admin);

app.use("/apiv1", apiv1);

app.listen(3004, "127.0.0.1");
