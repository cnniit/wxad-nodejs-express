var express = require("express");

var router = express.Router(); /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

// var DB=require('../../modules/db.js');  /*引入DB数据库*/
var DB = require("../../modules/mysqlDB.js"); /*引入DB数据库*/
var trycatchHandler = require("../../modules/trycatchHandler.js");
// router.get('/', async (req, res, next) => {
// 	const data = await trycatchHandler.readFileAsync('./package.json');
// 	// res.send(data);
//  next();
// });
// // Error Handler
// router.use(function (err, req, res, next) {
// 	console.error('Error:', err);
//     res.status(500).send(err.message);
//     // next();
// });
router.get("/", async (req, res, next) => {
  var sql = "select * from user";
  var data = await DB.query(sql);
  if (data.length > 0) {
    res.render("admin/user/index", {
      list: data
    });
  }
  next();
});

//处理登录的业务逻辑
router.get("/add", function(req, res, next) {
  res.send("显示增加用户");
  next();
});

module.exports = router; /*暴露这个 router模块*/
