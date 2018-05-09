以下为使用该产品化前端页面须知
一 产品化模块 
1 所有页面以模块划分，对应的样式，图片以及脚本归纳到其中。
2 每个模块可以独立拆分独立运行，而不特殊依赖于整体网站的资源，具体模块中页面文件需要的样式做引入配置操作，不需要的不引用。
3 模块中默认包含框架所需的基本样式，基本模块以及基本图片，相关框架文件保持基本配置。

二  前端代码模块化 
0 页面构成思路 ：布局+模块，布局+模块+组件,布局+组件（独立模块组件）
1 html代码以及css代码按照模块化思路，每个模块务必按照注释规范写明模块的使用场景
2 css命名按照nfc命名方式，规则如下：具体文档参考：http://nec.netease.com/standard/css-sort.html
/* 全局样式 */
.c-marginTop-s {margin-top:5px}
/* 布局 */
.g-sd{float:left;width:300px;}
/* 模块 */
.m-logo{width:200px;height:50px;}
/* 元件 */
.u-btn{height:20px;border:1px solid #333;}
/* 功能 */
.f-tac{text-align:center;}
/* 皮肤 */
.s-fc,a.s-fc:hover{color:#fff;}
/* 页面嵌入模块标识,规则 i-后面的2 3单词取引入模块的2 3单词  */
.i-header{}==.m-header  etc...

3 代码规范按照最新的代码规范书写，具体文档参考：http://www.w3cfuns.com/notes/18627/ba7564973151b716e7e6c4073f537b87.html
3.1 注意样式的继承与默认值，样式的缩写
3.2 注意css样式按照显示属性，位置属性，盒模型属性，修饰属性，伪类属性依次书写。
3.3 最终生产文件中的样式文件以及脚本文件务必保证为规范，压缩的版本。（尤其less文件在ie中是不支持编译运行的）

4 版本说明  
html版本：html5 使用说明查看：http://www.w3school.com.cn/html5/index.asp 
css版本：css3,针对需要兼容ie+的特殊情况，建议谨慎使用，引入必要的文件或者优雅降级，使用说明查看：http://www.w3school.com.cn/css/index.asp
js： es6版本, jquery:1.11.1  使用说明查看：http://hemin.cn/jq/
less: 2.5.3 版本  使用说明查看：http://lesscss.cn/features/，http://www.1024i.com/demo/less/
layer:2.1 pc版本 具体的使用说明查看 http://layer.layui.com/api.html
js -temple :artTemple  3.0版本 使用说明查看 ：http://aui.github.io/artTemplate/
ui框架 ：boot 3.0.3  使用说明查看：http://v3.bootcss.com/css/
滑屏轮播插件：swipper 3.3.1 ,具体说明查看：http://www.swiper.com.cn/api/index.html，文件存储于js对应的文件夹，展示页面查看demo即可


5 less目录说明
5.1 less汇总目录分为三个，专家端，患者端，后台端，组件以及全局模块的是三个端都默认加入的。
5.2 三个端的独特模块注意分清楚，每个端只引入自己需要的全部模块样式
5.3 三个入口的less对应 ，患者端 patientBasic.less, 后台端basic.less ,专家端 expertBasic.less


6 swaggerui js部分的使用说明 


-----------------注意事项--------------
 
-网络诊间展示首页轮播图比例  1920*400 
-
