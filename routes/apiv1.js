/**
 * Created by Administrator on 2018/3/20 0020.
 */
var express = require("express");



var router = express.Router(); /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
var DB=require('../modules/mysqlDB.js');
var multiparty = require("multiparty"); /*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/
var fs = require("fs");
var trycatchHandler = require("../modules/trycatchHandler.js");

router.get("/product", async (req, res) => {

    var sql = "select * from product";
    var data = await DB.query(sql);
    if (data.length > 0) {
      res.send(data)
    }
 });

 router.post("/productDoAdd", function(req, res) {
  //获取表单的数据 以及post过来的图片

  var form = new multiparty.Form();

  form.uploadDir = "upload"; //上传图片保存的地址     目录必须存在

  form.parse(req, async (err, fields, files) => {
    //获取提交的数据以及图片上传成功返回的图片信息
    //
    console.log(fields);  /*获取表单的数据*/
    
    console.log(files);  /*图片上传成功返回的信息*/
    var title = fields.title[0];
    var price = fields.price[0];
    var fee = fields.fee[0];
    var description = fields.description[0];
    var pic = files.file[0].path;
    // console.log(pic);
    var sql =
      "insert into product(title,price,fee,description,pic)	 VALUES( ?,?,?,?,?)";
    var Sql_Params = [title, price, fee, description, pic];
    if (await DB.query(sql, Sql_Params)) {
      // res.redirect("/admin/product"); /*上传成功跳转到首页*/
      res.send('1')
    }
  });
});

 router.post("/productedit", async (req, res) => {
  //获取get传值 id
  var _id = req.body.id;
  //去数据库查询这个id对应的数据     自增长的id 要用{"_id":new DB.ObjectID(id)

  var sql = "select * from product where _id=" + _id;
  var data = await DB.query(sql);
  if (data.length > 0) {
    // res.render("admin/product/edit", {
    //   list: data[0]
    // });
    res.send(data[0])
  }
});

router.post("/productDoEdit", async (req, res) => {
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
    // var originalFilename = files.pic[0].originalFilename;
    
    if (Object.keys(files).length!=0) {
      var pic = files.pic[0].path;
      /*修改了图片*/
      ModSql =
        "UPDATE product SET title = ? , price = ? , fee = ? , description = ? , pic = ? WHERE _id = ?";

      ModSql_Params = [title, price, fee, description, pic, _id];
    } else {
      /*没有修改图片*/
      //删除生成的临时文件

      // fs.unlink(pic, () => {});
      ModSql =
        "UPDATE product SET title = ? , price = ? , fee = ? , description = ? WHERE _id = ?";

      ModSql_Params = [title, price, fee, description, _id];
    }

    if (await DB.query(ModSql, ModSql_Params)) {
      // res.redirect("/admin/product");
      res.send('1')
    }
  });
});

router.post("/productdelete", async (req, res) => {
  //获取id
  var id = req.body.id;
  var sql = "delete from product where _id=" + id;
  if (await DB.query(sql)) {
    // res.redirect("/admin/product");
    res.send('1')
  }else{
    res.send('0')
  }
});


router.post("/singlern", async (req, res) => {
  var source = req.body.srcpath;
  var destdir = req.body.destdir;
  var newfilename = req.body.newfilename;
  var timestamp = new Date().getTime();
  await trycatchHandler.CopyDirectory(source, destdir + "/" + timestamp);
  fs.renameSync(destdir + "/" + timestamp, destdir + "/" + newfilename);
  res.send(
    `${newfilename}`
  );
  // res.render('admin/wjj/succ-singlern');

});

router.post("/multirn", async (req, res) => {
  var source = req.body.srcpath;
  var destdir = req.body.destdir;
  var links = req.body.links;
  var arr = [];
  for (var i = 0; i < links.length; i++) {
    var timestamp = new Date().getTime();
    await trycatchHandler.CopyDirectory(source, destdir + "/" + timestamp);
    fs.renameSync(
      destdir + "/" + timestamp,
      destdir + "/" + links[i]
    );
    // console.log(JSON.parse(links)[i])
    var p = {
      destdir: destdir,
      link: links[i]
    };
    arr.push(p);
  }
  // console.log(arr)
  // res.render("admin/wjj/succ-multirn", {
  //   list: arr
  // });
  res.send(arr)

});

router.post("/indexrn", async (req, res) => {
  var source = req.body.srcpath;
  var destdir = req.body.destdir;
  var fromindex = req.body.fromindex;
  var toindex = req.body.toindex;
  var timestamp = new Date().getTime();

  var p = {
    code: 0,
    tpl: `${fromindex}-${toindex}`
  };
  for (var i = fromindex; i <= toindex; i++) {
    var timestamp = new Date().getTime();
    try {
      await trycatchHandler.CopyDirectory(source, destdir + "/" + timestamp);
      fs.renameSync(destdir + "/" + timestamp, destdir + "/" + i);     
      p.code='1' 
    } catch (error) {
      console.log(error)
      p.code='0' 
    }
  }
  res.send(p)

});

router.post("/singlecr", async (req, res) => {
  var table_name = req.body.table_name;

  var p = {
    code: 0,
    tpl: `${table_name}`
  };

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

    try {
      await DB.query(sql);
        var sql = "insert into " + table_name + "(linkname) VALUES( ?)";
        var Sql_Params = ["fake"];
        await DB.query(sql, Sql_Params);
      p.code='1' 
    } catch (error) {
      console.log(error)
      p.code='0' 
    }

  res.send(p)
});

router.post("/multicr", async (req, res) => {
  var prefix_name = req.body.prefix_name;
  var fromindex = req.body.fromindex;
  var toindex = req.body.toindex;
  var a = prefix_name + fromindex;
  var b = prefix_name + toindex;

  var p = {
    code: 0,
    tpl: `${a}-${b}`
  };
  var sql ="CALL myproce3(?,?,?)";
  var Sql_Params = [prefix_name,fromindex,toindex];
  await DB.query(sql,Sql_Params)
  p.code='1' 
  
  res.send(p)

});

router.get("/dm", async (req, res) => {
  var sql = "select * from dm";
  var data = await DB.query(sql);
  if (data.length > 0) {
    res.send(data)
  }
});

 router.post("/dmDoAdd", function(req, res) {
  //获取表单的数据 以及post过来的图片

  var form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    //获取提交的数据以及图片上传成功返回的图片信息
    //
    // console.log(fields);  /*获取表单的数据*/
    
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
    // console.log(pic);
    var sql =
      "insert into dm(linkname,cnzzdm,cnzztj,utq2,utq3,byjc,byzh,bPC)	 VALUES(?, ?,?,?,?,?,?,?)";
    var Sql_Params = [linkname, cnzzdm, cnzztj, utq2, utq3, byjc, byzh, bPC];
    if (await DB.query(sql, Sql_Params)) {
      // res.redirect("/admin/product"); /*上传成功跳转到首页*/
      res.send('1')
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

router.post("/dmdelete", async (req, res) => {
  //获取id
  var id = req.body.id;
  var sql = "delete from dm where id=" + id;
  if (await DB.query(sql)) {
    // res.redirect("/admin/product");
    res.send('1')
  }else{
    res.send('0')
  }
});

 router.post("/dmedit", async (req, res) => {
  //获取get传值 id
  var _id = req.body.id;
  //去数据库查询这个id对应的数据     自增长的id 要用{"_id":new DB.ObjectID(id)

  var sql = "select * from dm where id=" + _id;
  var data = await DB.query(sql);
  if (data.length > 0) {
    // res.render("admin/product/edit", {
    //   list: data[0]
    // });
    res.send(data[0])
  }
});

router.post("/dmDoEdit", async (req, res) => {
    var form = new multiparty.Form();
    var ModSql, ModSql_Params;
    form.parse(req, async (err, fields, files) => {
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
        // res.redirect("/admin/product");
        res.send('1')
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


module.exports = router; /*暴露这个 router模块*/