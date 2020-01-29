/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : koacms

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-12-21 17:07:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dm
-- ----------------------------
DROP TABLE IF EXISTS `dm`;
CREATE TABLE `dm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `linkname` varchar(255) DEFAULT NULL,
  `cnzzdm` varchar(255) DEFAULT NULL,
  `cnzztj` varchar(255) DEFAULT NULL,
  `utq2` varchar(255) DEFAULT NULL,
  `utq3` varchar(255) DEFAULT NULL,
  `byjc` varchar(255) DEFAULT NULL,
  `byzh` varchar(255) DEFAULT NULL,
  `bPC` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm
-- ----------------------------
INSERT INTO `dm` VALUES ('80', 'kkk', '<script type=\"text/javascript\" src=\"https://s9.cnzz.com/z_stat.php?id=1234567890&web_id=1234567890\"></script>', '<script>var _czc = _czc || [];_czc.push([\'_setAccount\', \'1234567890\']);</script>', 'Search', '123456', '', '', '1');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT '0',
  `price` double DEFAULT '0',
  `fee` double DEFAULT '0',
  `description` varchar(50) DEFAULT '0',
  `pic` varchar(50) DEFAULT '0',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('8', 'bbbb', '5', '5', '5', 'upload\\6EwVWue3emLJi8C0o2nuNEhl.jpg');
INSERT INTO `product` VALUES ('9', 'nn', '66', '66', '66', 'upload\\moGcz4FRQuzWEc9WKm2qY-Ez.jpg');
INSERT INTO `product` VALUES ('10', '77', '7', '7', '7', 'upload\\f16FayymkS22yHbtbSBz_z3Q.jpg');
INSERT INTO `product` VALUES ('11', '8', '8', '8', '88', 'upload\\YwAbv73plapGZqSml8JcUFpZ.jpg');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e');
INSERT INTO `user` VALUES ('2', 'zhangsan', 'e10adc3949ba59abbe56e057f20f883e');

-- ----------------------------
-- Procedure structure for myproce3
-- ----------------------------
DROP PROCEDURE IF EXISTS `myproce3`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `myproce3`(in `prefix_name` varchar(80),in `fromindex` int,in `toindex` int)
begin

DECLARE i INT;
DECLARE table_name VARCHAR(120);
SET i = fromindex;
 
WHILE  i<=toindex DO

SET table_name = CONCAT(prefix_name,i);

SET @csql = CONCAT(
	'CREATE TABLE ',table_name,'(
		`id` int(11) NOT NULL AUTO_INCREMENT,
		`linkname` varchar(255) DEFAULT NULL,
		`cnzzdm` varchar(255) DEFAULT NULL,
		`cnzztj` varchar(255) DEFAULT NULL,
		`utq2` varchar(255) DEFAULT NULL,
		`utq3` varchar(255) DEFAULT NULL,
		`byjc` varchar(255) DEFAULT NULL,
		`byzh` varchar(255) DEFAULT NULL,
		`bPC` varchar(11) DEFAULT NULL,
		PRIMARY KEY (`id`)
	  
	  )ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8'
	  );
 
PREPARE create_stmt FROM @csql;
EXECUTE create_stmt;

SET @csql2 = CONCAT(
	'INSERT INTO ',table_name,'(linkname) VALUES("fake")'
	  );
 
PREPARE ins_stmt FROM @csql2;
EXECUTE ins_stmt;

SET i = i+1;
END WHILE;
	
end
;;
DELIMITER ;
