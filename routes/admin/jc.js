var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
const cookieParase = require("cookie-parser");
const multiparty = require("multiparty");

var router = express.Router(); /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

// var DB=require('../../modules/db.js');  /*引入DB数据库*/
var DB = require("../../modules/mysqlDB.js"); /*引入DB数据库*/
var trycatchHandler = require("../../modules/trycatchHandler.js");
// router.get('/', async (req, res, next) => {
// 	const data = await trycatchHandler.readFileAsync('./package.json');
// 	// res.send(data);
//  next();
// });

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.use(cookieParase());

router.get("/", async (req, res, next) => {
  res.render("admin/jc/index", {
    list: "这是jc首页"
  });
});

router.post("/singlecr", async (req, res, next) => {
  var table_name = req.body.table_name;
  var sql =
    "CREATE TABLE " +
    table_name +
    " (" +
    "`id` int(11) NOT NULL AUTO_INCREMENT," +
    "`linkname` varchar(255) DEFAULT NULL," +
    "`cnzzdm` varchar(255) DEFAULT NULL," +
    "   `cnzztj` varchar(255) DEFAULT NULL," +
    "   `utq2` varchar(255) DEFAULT NULL," +
    "   `utq3` varchar(255) DEFAULT NULL," +
    "   `byjc` varchar(255) DEFAULT NULL," +
    "   `byzh` varchar(255) DEFAULT NULL," +
    "   `bPC` varchar(255) DEFAULT NULL," +
    "   PRIMARY KEY (`id`)" +
    "   )ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8";

  await DB.query(sql);

  var sql = "insert into " + table_name + "(linkname) VALUES( ?)";
  var Sql_Params = ["fake"];
  await DB.query(sql, Sql_Params);
  // res.render('admin/wjj/succ-multirn');
  res.send(
    "<script>alert('创建表" +
      table_name +
      "成功！');location.href='./'</script>"
  );

  next();
});

router.post("/multicr", async (req, res, next) => {
  var prefix_name = req.body.prefix_name;
  var fromindex = req.body.fromindex;
  var toindex = req.body.toindex;
  var a = prefix_name + fromindex;
  var b = prefix_name + toindex;
  var sql =
    "CALL myproce3('" + prefix_name + "', " + fromindex + ", " + toindex + ")";
  await DB.query(sql);
  // res.render('admin/wjj/succ-multirn');
  res.send(
    "<script>alert('重命名目录" +
      a +
      "~" +
      b +
      "成功！');location.href='./'</script>"
  );

  next();
});

// Error Handler
router.use(function(err, req, res, next) {
  console.error("Error:", err);
  res.status(500).send(err.message);
  next();
});

module.exports = router; /*暴露这个 router模块*/
