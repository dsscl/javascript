## 场景设置

首先有一个普通的正方形div，并且有一堆设置按钮，现在想要通过这些按钮来控制div的显示/隐藏、背景颜色、边框颜色、长宽等属性，该怎么做？

实践中类似场景，例如手机的设置、控制中心，以及每个网页都有的个人中心里的设置等

难点：

1）我们可能会有更多的属性需要控制，也有更多的目标元素需要控制

2）构建代码之初，目标元素们可能存在于不同的模块中，如何通过单一的变量来控制不同的目标元素？

方案：

Redux + React

Vuex + Vue

下面手动实现一个简单的状态管理模块