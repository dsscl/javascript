## gulp使用基本环境
- 保证计算机有node环境以及全局已经安装完成gulp，node去官网下载，gulp的全局安装命令是npm install gulp -g；


## gulp指令

### 首次从git上克隆项目应该做的事情
- 到项目根目录下用指令安装相关依赖，【指令】：npm i;
- 到dev/dist/js/swagger 目录下面安装superagent，【指令】：npm i --save-dev superagent;

### git上代码下载后重新build命令
- 【指令】：gulp toBuildDev;
- git上的代码是没有从less生成的css和需要build的js文件的，这个命令可以在当前dev路径下面生成需要的bun文件;
- 生成好的css文件是被压缩的，生成的js文件是没有被压缩的版本;

### git打包生成生产代码
- 【指令】：gulp toZip;
- 将现在的dev目录下的文件打包压缩成我们需要的zip包；
- 如果swagger里面的config文件的环境（environment）为production，则会将bun的js代码混淆以后输出；

