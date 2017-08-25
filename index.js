#!/usr/bin/env node
'use strict';
var program = require('commander');
var packageJson = require('./package.json');
var lib = require('./lib')
program
    .version(packageJson.version);
program
    .command("create <name>").action(function(name){
        lib.create(name);
    })
program
    .command('list')//声明hi下有一个命令叫list
    .description('list files in current working directory')//给出list这个命令的描述
    .option('-a, --all', 'Whether to display hidden files')//设置list这个命令的参数
    .action(function(options) {//list命令的实现体
        var fs = require('fs');
        //获取当前运行目录下的文件信息
        fs.readdir(process.cwd(), function(err, files) {
            var list = files;
            //检查用户是否给了--all或者-a的参数，如果没有，则过滤掉那些以.开头的文件
            if (!options.all) {
                list = files.filter(function(file) {
                    return file.indexOf('.') !== 0;
                });
            }
            console.log(list.join(' '));//控制台将所有文件名打印出来
        });
    });

program.parse(process.argv);
