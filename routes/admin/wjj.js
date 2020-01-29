var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");

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

router.get("/", async (req, res, next) => {
  res.render("admin/wjj/index", {
    list: "这是wjj首页"
  });
});

//处理登录的业务逻辑
router.get("/singlern", async (req, res, next) => {
  var source = req.query.srcpath;
  var destdir = req.query.destdir;
  var newfilename = req.query.newfilename;
  var timestamp = new Date().getTime();
  await trycatchHandler.CopyDirectory(source, destdir + "/" + timestamp);
  fs.renameSync(destdir + "/" + timestamp, destdir + "/" + newfilename);
  res.send(
    "<script>alert('重命名目录" +
      newfilename +
      "成功！');location.href='./'</script>"
  );
  // res.render('admin/wjj/succ-singlern');
  next();

  next();
});

router.post("/multirn", async (req, res, next) => {
  var source = req.body.srcpath;
  var destdir = req.body.destdir;
  var links = req.body.links[0];

  var arr = [];
  for (var i = 0; i < JSON.parse(links).length; i++) {
    var timestamp = new Date().getTime();
    await trycatchHandler.CopyDirectory(source, destdir + "/" + timestamp);
    fs.renameSync(
      destdir + "/" + timestamp,
      destdir + "/" + JSON.parse(links)[i]
    );
    // console.log(JSON.parse(links)[i])
    var p = {
      destdir: destdir,
      link: JSON.parse(links)[i]
    };
    arr.push(p);
  }
  // console.log(arr)
  res.render("admin/wjj/succ-multirn", {
    list: arr
  });

  next();
});

router.post("/indexrn", async (req, res, next) => {
  var source = req.body.srcpath;
  var destdir = req.body.destdir;
  var fromindex = req.body.fromindex;
  var toindex = req.body.toindex;
  var timestamp = new Date().getTime();
  for (var i = fromindex; i <= toindex; i++) {
    var timestamp = new Date().getTime();
    await trycatchHandler.CopyDirectory(source, destdir + "/" + timestamp);
    fs.renameSync(destdir + "/" + timestamp, destdir + "/" + i);
    // console.log(i)
  }
  // res.render('admin/wjj/succ-multirn');
  res.send(
    "<script>alert('重命名目录" +
      fromindex +
      "~" +
      toindex +
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
