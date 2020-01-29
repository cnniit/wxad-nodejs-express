# wxad-nodejs-express

http://vue.npmjs.top/testdir/2/

5、接口说明
通过id删除商品：http://localhost:3100/goodDel?id=115

添加商品：http://localhost:3100/goodAdd? name=123&desc=123&price=123&sum=234

通过id修改商品：http://localhost:3100/goodUpdate?name=123&desc=2313&price=12&sum=12&id=1

查询所有商品：http://localhost:3000/goodAll

查询单个商品：http://localhost:3100/goodById?id=112



基于 Vue + Element UI 的后台管理系统解决方案。[线上地址](http://vue.npmjs.top/) [后端项目地址](http://vue.npmjs.top/)



## 前言

该后台系统模板是广告推广统计系统界面。基于 vue.js，使用 vue-cli3 脚手架，引用 Element UI 组件库。

## 功能

-   [x] Dashboard
-   [x] 用户管理
-   [x] 推广页管理
-   [x] 基础管理
-   [x] 代码管理


## 安装步骤

```
git clone https://github.com/cnniit/wxad-nodejs-element-ui.git      // 把模板下载到本地
cd wxad-nodejs-element-ui    // 进入模板目录
npm install         // 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn

// 开启服务器，浏览器访问 http://localhost:8080
npm run serve

// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```

## License

[MIT](https://github.com/cnniit/wxad-nodejs-element-ui/blob/master/LICENSE)

