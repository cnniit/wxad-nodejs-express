var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
const cookieParase = require("cookie-parser");
const multiparty = require("multiparty");
var form = new multiparty.Form();
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

router.get("/", async (req, res) => {
  var sql = "select * from dm";
  var data = await DB.query(sql);
  if (data.length > 0) {
    res.render("admin/dm/index", {
      list: data,
      listtitle: "这个dm首页"
    });
  }
});
//处理登录的业务逻辑
router.get("/add", async (req, res) => {
  res.render("admin/dm/add");
});
//doAdd
router.post("/doAdd", function(req, res) {
  //获取表单的数据 以及post过来的图片

  var form = new multiparty.Form();

  form.uploadDir = "upload"; //上传图片保存的地址     目录必须存在

  form.parse(req, async (err, fields, files) => {
    //获取提交的数据以及图片上传成功返回的图片信息
    //
    //console.log(fields);  /*获取表单的数据*/
    //
    //console.log(files);  /*图片上传成功返回的信息*/
    var linkname = fields.linkname[0];
    var cnzzdm = fields.cnzzdm[0];
    var cnzztj = "";
    var utq2 = fields.utq2[0];
    var utq3 = fields.utq3[0];
    var byjc = fields.byjc[0];
    var byzh = fields.byzh[0];
    var bPC = fields.bPC[0];
    var re = /(\d+\.?\d+)/;
    if (re.test(cnzzdm)) {
      cnzztj =
        "<script>var _czc = _czc || [];_czc.push(['_setAccount', '" +
        cnzzdm.match(re)[0] +
        "']);</script>";
    }
    var sql =
      "insert into dm(linkname,cnzzdm,cnzztj,utq2,utq3,byjc,byzh,bPC)	 VALUES(?, ?,?,?,?,?,?,?)";
    var Sql_Params = [linkname, cnzzdm, cnzztj, utq2, utq3, byjc, byzh, bPC];
    if (await DB.query(sql, Sql_Params)) {
      res.redirect("/admin/dm"); /*上传成功跳转到首页*/
    }

    console.log("准备打开文件！");
    fs.open("./gen-js/" + linkname + ".js", function(err, fd) {
      if (err) {
        return console.error(err);
      }
      console.log("文件打开成功！");
    });

    $txt = "cnzzdm = '" + cnzzdm + "'"; // output's bar
    $txt2 = "cnzztj = '" + cnzztj + "'";
    $txt3 = "utq2 = '" + utq2 + "'";
    $txt4 = "utq3 = '" + utq3 + "'";
    $txt5 = "byjc = '" + byjc + "'";
    $txt6 = "byzh = '" + byzh + "'";
    $txt7 = "bPC = '" + bPC + "'";
    var c =
      $txt +
      ";" +
      $txt2 +
      ";" +
      $txt3 +
      ";" +
      $txt4 +
      ";" +
      $txt5 +
      ";" +
      $txt6 +
      ";" +
      $txt7;

    fs.writeFile("./gen-js/" + linkname + ".js", c, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  });
});

router.get("/edit", async (req, res) => {
  //获取get传值 id

  var _id = req.query.id;

  //去数据库查询这个id对应的数据     自增长的id 要用{"_id":new DB.ObjectID(id)

  var sql = "select * from dm where id=" + _id;
  var data = await DB.query(sql);
  if (data.length > 0) {
    res.render("admin/dm/edit", {
      list: data[0]
    });
  }
});
router.post("/doEdit", async (req, res) => {
  var form = new multiparty.Form();
  var ModSql, ModSql_Params;
  form.uploadDir = "upload"; // 上传图片保存的地址
  form.parse(req, async (err, fields, files) => {
    //获取提交的数据以及图片上传成功返回的图片信息
    var _id = fields.id[0]; /*修改的条件*/
    var linkname = fields.linkname[0];
    var cnzzdm = fields.cnzzdm[0];
    var cnzztj = "";
    var utq2 = fields.utq2[0];
    var utq3 = fields.utq3[0];
    var byjc = fields.byjc[0];
    var byzh = fields.byzh[0];
    var bPC = fields.bPC[0];
    var re = /(\d+\.?\d+)/;
    if (re.test(cnzzdm)) {
      cnzztj =
        "<script>var _czc = _czc || [];_czc.push(['_setAccount', '" +
        cnzzdm.match(re)[0] +
        "']);</script>";
    }

    ModSql =
      "UPDATE dm SET cnzzdm = ? , cnzztj = ? , utq2 = ? , utq3 = ? , byjc = ? , byzh = ? ,  bPC = ? WHERE id = ?";

    ModSql_Params = [cnzzdm, cnzztj, utq2, utq3, byjc, byzh, bPC, _id];

    if (await DB.query(ModSql, ModSql_Params)) {
      res.redirect("/admin/dm");
    }

    console.log("准备打开文件！");
    fs.open("./gen-js/" + linkname + ".js", function(err, fd) {
      if (err) {
        return console.error(err);
      }
      console.log("文件打开成功！");
    });

    $txt = "cnzzdm = '" + cnzzdm + "'"; // output's bar
    $txt2 = "cnzztj = '" + cnzztj + "'";
    $txt3 = "utq2 = '" + utq2 + "'";
    $txt4 = "utq3 = '" + utq3 + "'";
    $txt5 = "byjc = '" + byjc + "'";
    $txt6 = "byzh = '" + byzh + "'";
    $txt7 = "bPC = '" + bPC + "'";
    var c =
      $txt +
      ";" +
      $txt2 +
      ";" +
      $txt3 +
      ";" +
      $txt4 +
      ";" +
      $txt5 +
      ";" +
      $txt6 +
      ";" +
      $txt7;

    fs.writeFile("./gen-js/" + linkname + ".js", c, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was updated!");
    });
  });
});

router.get("/delete", async (req, res) => {
  //获取id

  var id = req.query.id;

  var sql = "delete from dm where id=" + id;
  if (await DB.query(sql)) {
    res.redirect("/admin/dm");
  }
});

module.exports = router; /*暴露这个 router模块*/
