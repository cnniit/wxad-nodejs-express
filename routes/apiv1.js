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

/**
 * @api {POST} /singlern 单个方式
 * @apiDescription 单个复制推广页，并重命名（目录）
 * @apiName singlern
 * @apiParam (path参数) {String} srcpath 
 * @apiParam (path参数) {String} destdir 
 * @apiParam (path参数) {String} newfilename 
  * @apiSuccessExample {json} 成功返回:
* 推广页（目录）名
  @apiErrorExample {json} 失败返回:
{
    "code": 错误原因
}
 * @apiSampleRequest http://ent.npmjs.top/apiv1/singlern
 * @apiGroup 推广页管理
 * @apiVersion 1.0.0
 */
router.post("/singlern", async (req, res) => {
  var source = req.body.srcpath;
  var destdir = req.body.destdir;
  var newfilename = req.body.newfilename;
  var timestamp = new Date().getTime();
  await trycatchHandler.CopyDirectory(source, destdir + "/" + timestamp);
    try {
      fs.renameSync(destdir + "/" + timestamp, destdir + "/" + newfilename);
      res.send(
        `${newfilename}`
      );
     }
     catch (e) {
      res.send({"code":e.code});
     }

  // res.render('admin/wjj/succ-singlern');

});

/**
 * @api {POST} /multirn 多个方式
 * @apiDescription 批量复制推广页，并重命名（目录）
 * @apiName multirn
 * @apiParam (body-json参数) {String} srcpath 
 * @apiParam (body-json参数) {String} destdir 
 * @apiParam (body-json参数) {String} links 
 * @apiParamExample {json} 实例请求:
{
"srcpath":"/Users/zhengjiamao/Desktop/t2",
"destdir":"/Users/zhengjiamao/Desktop",
"links":["newdir1","newdir2"]
}
   * @apiSuccessExample {json} 成功返回:
[
    {
        "destdir": 新目录所在目录,
        "link": 重命名目录1
    },
    ...
]
  @apiErrorExample {json} 失败返回:
{
    "code": 错误原因
}
 * @apiSampleRequest http://ent.npmjs.top/apiv1/multirn
 * @apiGroup 推广页管理
 * @apiVersion 1.0.0
 */
router.post("/multirn", async (req, res) => {
  var source = req.body.srcpath;
  var destdir = req.body.destdir;
  var links = req.body.links;
  var arr = [];
  for (var i = 0; i < links.length; i++) {
    var timestamp = new Date().getTime();
    await trycatchHandler.CopyDirectory(source, destdir + "/" + timestamp);

    try {
      fs.renameSync(
        destdir + "/" + timestamp,
        destdir + "/" + links[i]
      );
     }
     catch (e) {
      res.send({"code":e.code});
     }
    // console.log(JSON.parse(links)[i])
    var p = {
      destdir: destdir,
      link: links[i]
    };
    arr.push(p);
  }
  res.send(arr)

});

/**
 * @api {POST} /indexrn 索引方式
 * @apiDescription 批量复制推广页，并按起止后缀重命名（目录）
 * @apiName indexrn
 * @apiParam (path参数) {String} srcpath 
 * @apiParam (path参数) {String} destdir 
 * @apiParam (path参数) {Number} fromindex 
 * @apiParam (path参数) {Number} toindex 
   * @apiSuccessExample {json} 成功返回:
{
    "code": "1",
    "tpl": 开始后缀序号 - 结束后缀序号
}
  @apiErrorExample {json} 失败返回:
{
    "code": "0",
    "tpl": 开始后缀序号 - 结束后缀序号
}
 * @apiSampleRequest http://ent.npmjs.top/apiv1/indexrn
 * @apiGroup 推广页管理
 * @apiVersion 1.0.0
 */
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
    await trycatchHandler.CopyDirectory(source, destdir + "/" + timestamp);
    try {
      fs.renameSync(destdir + "/" + timestamp, destdir + "/" + i);     
      p.code='1' 
    } 
    catch (e) {
      // res.send({"code":e.code});
      p.code='0'
     }
  }
  res.send(p)

});

/**
 * @api {POST} /singlecr 单个建表
 * @apiDescription 输入表名（目录名）一键建表，一次建一个表 
 * @apiName singlecr
 * @apiParam (path参数) {String} table_name
 * @apiSampleRequest http://ent.npmjs.top/apiv1/singlecr
 * @apiSuccessExample {json} 成功返回:
                   {
                        "code": "1",
                        "tpl": 表名
                    }
  @apiErrorExample {json} 失败返回:
                    Error 0: 
 * @apiGroup 基础管理
 * @apiVersion 1.0.0
 */
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

/**
 * @api {POST} /multicr 批量建表
 * @apiDescription 输入前缀和后缀起止数字，批量建表
 * @apiName multicr
 * @apiParam (path参数) {String} prefix_name 
 * @apiParam (path参数) {Number} fromindex 
 * @apiParam (path参数) {Number} toindex 
 * @apiSuccessExample {json} 成功返回:
{
    "code": "1",
    "tpl": 前缀+开始数字-前缀+结束数字
}
  @apiErrorExample {json} 失败返回:
                    Error 0: 
 * @apiSampleRequest http://ent.npmjs.top/apiv1/multicr
 * @apiGroup 基础管理
 * @apiVersion 1.0.0
 */
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

/**
 * @api {GET} /dm 代码列表
 * @apiDescription 获取所有统计代码列表
 * @apiName dm
 * @apiSampleRequest http://ent.npmjs.top/apiv1/dm
 * @apiGroup 代码管理
 * @apiVersion 1.0.0
 */
router.get("/dm", async (req, res) => {
  var sql = "select * from dm";
  var data = await DB.query(sql);
  if (data.length > 0) {
    res.send(data)
  }
});

/**
 * @api {POST} /dmDoAdd 增加代码
 * @apiDescription 增加一个统计代码
 * @apiName dmDoAdd
 * @apiParam (form-data参数) {String} linkname 
 * @apiParam (form-data参数) {String} cnzzdm 
 * @apiParam (form-data参数) {String} utq2 
 * @apiParam (form-data参数) {String} utq3 
 * @apiParam (form-data参数) {String} byjc 
 * @apiParam (form-data参数) {String} byzh 
 * @apiParam (form-data参数) {String} bPC 
  * @apiSuccessExample {json} 成功返回:
{
    "linkname": linkname,
    "code": 1
}
  @apiErrorExample {json} 失败返回:
{
    "linkname": linkname,
    "code": 0
}
 * @apiGroup 代码管理
 * @apiVersion 1.0.0
 */
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
    var p = {
      "linkname":linkname,
      "code":0
    }
    var sql =
    // "insert into dm(linkname,cnzzdm,cnzztj,utq2,utq3,byjc,byzh,bPC)	 VALUES(?, ?,?,?,?,?,?,?)";
    "INSERT INTO dm(linkname,cnzzdm,cnzztj,utq2,utq3,byjc,byzh,bPC)  SELECT ?,?,?,?,?,?,?,? FROM dual WHERE NOT EXISTS(  SELECT * FROM dm WHERE linkname = ? ); ";
    var Sql_Params = [linkname, cnzzdm, cnzztj, utq2, utq3, byjc, byzh, bPC   ,linkname];
    try {
      var r = await DB.query(sql, Sql_Params)
      if (r.affectedRows) {

      console.log("准备打开文件！");
      fs.open("./gen-js/" + linkname + ".js", 'a+',function(err, fd) {
        if (err) throw err
        console.log("文件打开成功！");
      });
  
      $txt = "cnzzdm = '" + cnzzdm + "'"; // output's bar
      $txt2 = "cnzztj = '" + cnzztj + "'";
      $txt3 = "utq2 = '" + utq2 + "'";
      $txt4 = "utq3 = '" + utq3 + "'";
      $txt5 = "byjc = '" + byjc + "'";
      $txt6 = "byzh = '" + byzh + "'";
      $txt7 = "bPC = '" + bPC + "'";
      var c = $txt +";" +$txt2 +";" +$txt3 +";" +$txt4 +";" +$txt5 +";" +$txt6 +";" +$txt7;
  
      fs.writeFile("./gen-js/" + linkname + ".js", c, function(err) {
        if (err) throw err
        console.log("The file was saved!");
      });
      p.code = 1
    }
    } catch (error) {

    }
    res.send(p)
  });
});

/**
 * @api {POST} /dmdelete 删除代码
 * @apiDescription 根据ID删除一个统计代码
 * @apiName dmdelete
 * @apiParam (path参数) {Number} id
  * @apiSuccessExample {json} 成功返回:
{
    "id": id,
    "code": 1
}
  @apiErrorExample {json} 失败返回:
{
    "id": id,
    "code": 0
}
 * @apiSampleRequest http://ent.npmjs.top/apiv1/dmdelete
 * @apiGroup 代码管理
 * @apiVersion 1.0.0
 */
router.post("/dmdelete", async (req, res) => {
  //获取id
  var id = req.body.id;
  var sql = "delete from dm where id=" + id;
  var p = {
    "id":id,
    "code":0
  }
    if(isNaN(id)) throw p
  try {
    var r = await DB.query(sql)
    p.code = r.affectedRows
    res.send(p)
  } catch (error) {
    res.send(error)
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

/**
 * @api {POST} /dmDoEdit 修改代码
 * @apiDescription 根据ID修改某个统计代码
 * @apiName dmDoEdit
 * @apiParam (form-data参数) {Number} id 必填
 * @apiParam (form-data参数) {String} linkname 必填 
 * @apiParam (form-data参数) {String} cnzzdm 
 * @apiParam (form-data参数) {String} utq2 
 * @apiParam (form-data参数) {String} utq3 
 * @apiParam (form-data参数) {String} byjc 
 * @apiParam (form-data参数) {String} byzh 
 * @apiParam (form-data参数) {String} bPC 
   * @apiSuccessExample {json} 成功返回:
{
    "id": id,
    "linkname": linkname,
    "code": 1
}
  @apiErrorExample {json} 失败返回:
{
    "id": id,
    "linkname": linkname,
    "code": 0
}
 * @apiSampleRequest http://ent.npmjs.top/apiv1/dmDoEdit
 * @apiGroup 代码管理
 * @apiVersion 1.0.0
 */
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
      var p = {
        "id":_id,
        "linkname":linkname,
        "code":0
      }
      ModSql =
        "UPDATE dm SET cnzzdm = ? , cnzztj = ? , utq2 = ? , utq3 = ? , byjc = ? , byzh = ? ,  bPC = ? WHERE id = ?";

      ModSql_Params = [cnzzdm, cnzztj, utq2, utq3, byjc, byzh, bPC, _id];

      try {
        var r = await DB.query(ModSql, ModSql_Params)
        if (r.affectedRows) {
          console.log("准备打开文件！");
          fs.open("./gen-js/" + linkname + ".js", 'a+',function(err, fd) {
            if (err) throw err
            console.log("文件打开成功！");
          });
    
          $txt = "cnzzdm = '" + cnzzdm + "'"; // output's bar
          $txt2 = "cnzztj = '" + cnzztj + "'";
          $txt3 = "utq2 = '" + utq2 + "'";
          $txt4 = "utq3 = '" + utq3 + "'";
          $txt5 = "byjc = '" + byjc + "'";
          $txt6 = "byzh = '" + byzh + "'";
          $txt7 = "bPC = '" + bPC + "'";
          var c = $txt +";" +$txt2 +";" +$txt3 +";" +$txt4 +";" +$txt5 +";" +$txt6 +";" +$txt7;
    
          fs.writeFile("./gen-js/" + linkname + ".js", c, function(err) {
            if (err) throw err
            console.log("The file was saved!");
          });
          p.code = 1
        }
      } catch (error) {
        
      }
      res.send(p)
    });
});


module.exports = router; /*暴露这个 router模块*/