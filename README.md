# wxad-nodejs-express


## 前言

基于 Node.js + Express + Mysql解决方案。为前端项目提供接口。
[线上地址](http://vue.npmjs.top/) [前端项目地址](https://github.com/cnniit/wxad-nodejs-element-ui)


## 接口说明
http://ent.npmjs.top/apidoc


## 功能
-   [x] Dashboard
-   [x] 用户管理
-   [x] 推广页管理-复制推广页，并重命名（目录）--生成文件访问路径为：http://vue.npmjs.top/目录名
-   [x] 基础管理--输入表名（目录名）一键建表，一次建一个表 --输入前缀和数字，批量建表
-   [x] 代码管理-生成JS文件--生成文件访问路径为：http://ent.npmjs.top/目录名.js


## 安装步骤

```
git clone https://github.com/cnniit/wxad-nodejs-express.git      // 把仓库下载到本地
cd wxad-nodejs-express    // 进入模板目录
npm install         // 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn

启动MySQL数据库，导入数据库文件 wxad-express-mysql.sql //需同时修改wxad-nodejs-express/modules/mysqlDB.js中数据库连接用户名、密码

// 开启服务器
node app.js

```

## License

[MIT](https://github.com/cnniit/wxad-nodejs-express/blob/master/LICENSE)

