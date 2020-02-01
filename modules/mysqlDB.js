/**
 * Created by Administrator on 2018/6/30 0030.
 */
var mysql = require("mysql");

//�������ӵķ���

function __connection() {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "koacms"
  });
  connection.connect();
  return connection;
}

exports.query = function(sql, parmas = null) {
  //1.��ȡ���ݿ����Ӷ���
  var connection = __connection();
  return new Promise(function(reject, resolve) {
    //2��ִ��sql���
    connection.query(sql, parmas, function(error, results, fields) {
      if (error) throw error;
      reject(results);
      
    });
    //3���ر�����
    connection.end();
  });
};


