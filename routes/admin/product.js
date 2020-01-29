/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express = require("express");

var router = express.Router(); /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

// var DB=require('../../modules/db.js');  /*引入DB数据库*/
var DB = require("../../modules/mysqlDB.js"); /*引入DB数据库*/
var multiparty = require("multiparty"); /*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/
var fs = require("fs");

router.get("/", async (req, res) => {
  var sql = "select * from product";
  var data = await DB.query(sql);
  if (data.length > 0) {
    res.render("admin/product/index", {
      list: data
    });
  }
});
//处理登录的业务逻辑
router.get("/add", async (req, res) => {
  res.render("admin/product/add");
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
    var title = fields.title[0];
    var price = fields.price[0];
    var fee = fields.fee[0];
    var description = fields.description[0];
    var pic = files.pic[0].path;
    console.log(pic);

    var sql =
      "insert into product(title,price,fee,description,pic)	 VALUES( ?,?,?,?,?)";
    var Sql_Params = [title, price, fee, description, pic];
    if (await DB.query(sql, Sql_Params)) {
      res.redirect("/admin/product"); /*上传成功跳转到首页*/
    }
  });
});

router.get("/edit", async (req, res) => {
  //获取get传值 id

  var _id = req.query.id;

  //去数据库查询这个id对应的数据     自增长的id 要用{"_id":new DB.ObjectID(id)

  var sql = "select * from product where _id=" + _id;
  var data = await DB.query(sql);
  if (data.length > 0) {
    res.render("admin/product/edit", {
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

    console.log(fields);
    console.log(files);
    var _id = fields._id[0]; /*修改的条件*/
    var title = fields.title[0];
    var price = fields.price[0];
    var fee = fields.fee[0];
    var description = fields.description[0];

    var originalFilename = files.pic[0].originalFilename;
    var pic = files.pic[0].path;

    if (originalFilename) {
      /*修改了图片*/
      ModSql =
        "UPDATE product SET title = ? , price = ? , fee = ? , description = ? , pic = ? WHERE _id = ?";

      ModSql_Params = [title, price, fee, description, pic, _id];
    } else {
      /*没有修改图片*/
      //删除生成的临时文件

      fs.unlink(pic, () => {});
      ModSql =
        "UPDATE product SET title = ? , price = ? , fee = ? , description = ? WHERE _id = ?";

      ModSql_Params = [title, price, fee, description, _id];
    }

    if (await DB.query(ModSql, ModSql_Params)) {
      res.redirect("/admin/product");
    }
  });
});

router.get("/delete", async (req, res) => {
  //获取id

  var id = req.query.id;

  var sql = "delete from product where _id=" + id;
  if (await DB.query(sql)) {
    res.redirect("/admin/product");
  }
});

module.exports = router; /*暴露这个 router模块*/
