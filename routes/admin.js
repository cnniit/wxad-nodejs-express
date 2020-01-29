/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express = require("express");

var router = express.Router(); /*��ʹ�� express.Router �ഴ��ģ�黯���ɹ��ص�·�ɾ��*/
//��̨��·��  ���еĺ�̨����Ҫ��������

var login = require("./admin/login.js");

/*Ȩ���ж�*/
router.use(function(req, res, next) {
  console.log(req.url);
  //next();
  if (req.url == "/login" || req.url == "/login/doLogin") {
    next();
  } else {
    if (req.session.userinfo && req.session.userinfo.username != "") {
      /*�ж���û�е�¼*/

      //app.locals  ȫ��
      //
      //req.app.locals  /*�����ȫ��*/

      req.app.locals["userinfo"] =
        req.session.userinfo; /*����ȫ�ֱ���  �������κ�ģ������ʹ��*/
      next();
    } else {
      res.redirect("/admin/login");
    }
  }
});

//����·��

router.use("/login", login);

module.exports = router; /*��¶��� routerģ��*/
