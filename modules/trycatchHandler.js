const fs = require("fs");
const path = require("path");
exports.readFileAsync = function(filepath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filepath, function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data.toString()));
    });
  });
};

function CopyDirectory(src, dest) {
  if (fs.existsSync(dest) == false) {
    fs.mkdirSync(dest);
  }
  if (fs.existsSync(src) == false) {
    return false;
  }
  // console.log("src:" + src + ", dest:" + dest);
  // 拷贝新的内容进去
  var dirs = fs.readdirSync(src);
  dirs.forEach(function(item) {
    var item_path = path.join(src, item);
    var temp = fs.statSync(item_path);
    if (temp.isFile()) {
      // 是文件
      // console.log("Item Is File:" + item);
      fs.copyFileSync(item_path, path.join(dest, item));
    } else if (temp.isDirectory()) {
      // 是目录
      // console.log("Item Is Directory:" + item);
      CopyDirectory(item_path, path.join(dest, item));
    }
  });
}

const Layer = require("express/lib/router/layer");
Object.defineProperty(Layer.prototype, "handle", {
  enumerable: true,
  get() {
    return this.__handle;
  },
  set(fn) {
    if (fn.length === 4) {
      this.__handle = fn;
    } else {
      this.__handle = (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch(next);
    }
  }
});

module.exports.CopyDirectory = CopyDirectory;
