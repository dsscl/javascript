
// 下面使用面向对象对drug.js进行封装
// 我们知道，在封装一个对象的时候，可以将属性与方法放置在构造函数或者原型中，而在增加了自执行函数之后，又可以将属性和方法放置在模块的内部作用域，这是闭包的知识
// 而我们面临的挑战是，如何合理地处理属性与方法的位置
// 每个对象的情况不同，不能一概而论，先清楚地区分这三种位置的特性
// 1）构造函数中：属性与方法为当前实例所单独拥有，只能被当前实例访问，并且每声明一个实例，其中的方法都会被重新创建一次
// 2）原型中：属性与方法为所有实例共同拥有，可以被所有实例访问，新声明的实例不会重复创建方法
// 3）模块作用域中：属性和方法不能被任何实例访问，但是能被内部方法访问，新声明的实例不会重复创建相同的方法

// 对于方法的判断则比较简单，因为构造函数中的方法总是在声明一个新的实例时被重复创建，因此声明方法时应尽量避免出现在构造函数中
// 如果你的方法中需要用到构造函数中的变量，或者想要公开，那么就需要放在原型中
// 如果方法需要私有不被外界访问，那么就放置在模块作用域中

// 对于属性应放置在什么位置很多时候很难做出正确的判断，因此很难给出一个准确的定义告诉你什么属性一定要放在什么位置，这需要在实际开发中总结经验
// 但是总体来说，仍然要结合着三个位置的特性来做出最合适的判断
// 1）如果属性值只能被实例单独拥有，比如person对象的name，那只能属于某一个person实例
// 2）又比如拖拽对象中，某一个元素的初始位置仅仅是这个元素的当前位置，那么这个属性适合放在构造函数中
// 3）如果一个属性仅仅供内部方法访问，那么这个属性就适合放在模块作用域中

(function() {
    // 这是一个私有属性，不需要被实例访问
    var transform = getTransform()

    function Drag(selector) {
        // 放在构造函数中的属性，被每一个实例所单独拥有
        this.elem = typeof selector == 'Object' ? selector : document.getElementById(selector)
        this.startX = 0
        this.startY = 0
        this.sourceX = 0
        this.sourceY = 0

        this.init()
    }

    // 原型
    Drag.prototype = {
        constructor: Drag,

        init: function() {
            // 初始时需要做哪些事情
            this.setDrag()
        },

        // 稍作改造，仅用于获取当前元素的属性，类似于getName
        getStyle: function(property) {
            return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(this.elem, false)[property]
            : this.elem.currentStyle[property]
        },

        // 用来获取当前元素的位置信息，注意与之前的不同之处
        getPosition: function() {
            var pos = {x: 0, y: 0}
            if(transform) {
                var transformValue = this.getStyle(transform)
                if(transformValue == 'none') {
                    this.elem.style[transform] = 'translate(0, 0)'
                } else {
                    var temp = transformValue.match(/-?\d+/g)
                    pos = {
                        x: parseInt(temp[4].trim()),
                        y: parseInt(temp[5].trim())
                    }
                }
            } else {
                if(this.getStyle('position') == 'static') {
                    this.elem.style.position = 'relative'
                } else {
                    pos = {
                        x: parseInt(this.getStyle('left') ? this.getStyle('left') : 0),
                        y: parseInt(this.getStyle('top') ? this.getStyle('top') : 0),
                    }
                }
            }

            return pos
        },

        // 用来设置当前元素的位置
        setPosition: function(pos) {
            if(transform) {
                this.elem.style[transform] = 'translate(' + pos.x + 'px, ' + pos.y + 'px)'
            } else {
                this.elem.style.left = pos.x + 'px'
                this.elem.style.top = pos.y + 'px'
            }
        },

        // 该方法用来绑定事件
        setDrag: function() {
            var self = this
            this.elem.addEventListener('mousedown', start, false)

            function start(event) {
                self.startX = event.pageX
                self.startY = event.pageY

                var pos = self.getPosition()

                self.sourceX = pos.x
                self.sourceY = pos.y

                document.addEventListener('mousemove', move, false)
                document.addEventListener('mouseup', end, false)
            }

            function move(event) {
                var currentX = event.pageX
                var currentY = event.pageY

                var distanceX = currentX - self.startX
                var distanceY = currentY - self.startY

                self.setPosition({
                    x: (self.sourceX + distanceX).toFixed(),
                    y: (self.sourceY + distanceY).toFixed()
                })
            }

            function end(event) {
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', end)
                // do other things
            }
        }
    }

    // 私有方法，仅仅用来获取transform的兼容方法
    function getTransform() {
        var transform = '',
        divStyle = document.createElement('div').style,
        transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],
        i = 0,
        len = transformArr.length

        for(;i<len;i++) {
            if(transformArr[i] in divStyle) {
                return transform = transformArr[i]
            }
        }

        return transform
    }

    // 一种对外暴露的方式
    window.Drag = Drag
})()

// 使用：声明2个拖拽实例
// new Drag('target')
// new Drag('target2')

// html
// <div id="target" style="width:100px;height:100px;background-color:pink"></div>
// <div id="target2" style="width:100px;height:100px;background-color:purple"></div>
// <script>
//     window.onload = function() {
//         new Drag('target')
//         new Drag('target2')
//     }
//   </script>


// 将拖拽对象扩展为一个jQuery插件
// 可以使用$.extend扩展jQuery工具方法，来使用$.fn.extend扩展原型方法
// 通过扩展方法将拖拽扩展为jQuery的一个实例方法
// (function($) {
//     $.fn.extend({
//         canDrag: function(){
//             new Drag(this[0])
//             return this
//             // 注意，为了保证jQuery所有方法都能够链式访问，每一个方法的最后都需要返回this，击jQuery实例
//         }
//     })
// })(jQuery)

// 这样就能够很轻松地让目标DOM元素具备拖拽能力了
// $('target').canDrag()