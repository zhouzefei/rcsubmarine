"use strict";
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var cwd = process.cwd();
var copy = require('./copy.js');
var copyDir = copy.copyDir,
  copyFile = copy.copyFile;

var createDir = function(config){
  try{
    fs.mkdirSync(path.resolve(cwd,'./'+config));
    console.log(chalk.green("→ create " + (path.resolve(cwd,'./'+config) + " success!")))
  }catch(error){
    if(error.code == 'EEXIST'){
      console.log(chalk.red("→ directory is exist"));
    }else{
      console.log(error.code);
      console.log(chalk.red("→ "+ error.message));
    }
  }
  return config;
};
var copySrc = function(config){
  var src = path.resolve(__dirname, "../template/src");
  var dist = path.resolve(cwd, "./" + config + "/src");
  copyDir(src, dist, function(err){
     if(err){
       console.log(err);
     }
  });
};
var copyFileJs = function(config){
  copyFile(path.resolve(cwd, "./" + config + "/webpack.config.js"),path.resolve(__dirname, "../template/webpack.config.js"));
  copyFile(path.resolve(cwd, "./" + config + "/webpack.config.product.js"),path.resolve(__dirname, "../template/webpack.config.product.js"));
  copyFile(path.resolve(cwd, "./" + config + "/package.json"),path.resolve(__dirname, "../template/package.json"));
};
module.exports = function(config){
  createDir(config),
  copySrc(config),
  copyFileJs(config)
}
