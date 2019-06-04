// 获取当前浏览器支持的transform兼容写法
function getTransform() {
    var transform = '',
    divStyle = document.createElement('div').style,
    _transforms = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],
    i = 0,
    len = _transforms.length;

    for(;i<len;i++) {
        if(_transforms[i] in divStyle) {
            return transform = _transforms[i]
        }
    }

    return transform
}

// 获取元素属性
function getStyle(elem, property) {
    // IE通过currentStyle来获取元素的样式
    // 其他浏览器通过getComputedStyle来获取
    return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(elem, false)[property] : elem.currentStyle[property]
}

// 获取元素的初始位置
function getTargetPos(elem) {
    var pos = {x: 0, y: 0}
    var transform = getTransform()
    if(transform) {
        var transformValue = getStyle(elem, transform)
        if(transformValue == 'none') {
            elem.style[transform] = 'translate(0, 0)'
            return pos
        } else {
            var temp = transformValue.match(/-?\d+/g)
            return pos = {
                x: parseInt(temp[4].trim()),
                y: parseInt(temp[5].trim())
            }
        }
    } else {
        if(getStyle(elem, 'position') == 'static') {
            elem.style.position = 'relative'
            return pos
        } else {
            var x = parseInt(getStyle(elem, 'left') ? getStyle(elem, 'left') : 0)
            var y = parseInt(getStyle(elem, 'top') ? getStyle(elem, 'top') : 0)
            return pos = {
                x: x,
                y: y
            }
        }
    }
}

// 设置元素的初始位置
// pos = {x: 200, y: 200}
function setTargetPos(elem, pos) {
    var transform = getTransform()
    if(transform) {
        elem.style[transform] = 'translate(' + pos.x + 'px, ' + pos.y + 'px)'
    } else {
        elem.style.left = pos.x + 'px'
        elem.style.top = pos.y + 'px'
    }
    return elem
}

var autumn = document.querySelector('.autumn')
autumn.addEventListener('click', function() {
    var curPos = getTargetPos(this)
    setTargetPos(this, {
        x: curPos.x + 5,
        y: curPos.y
    })
}, false)

// 总结
// 1）拖拽的原理
// mousedown 鼠标按下时触发，mousemove鼠标移动时触发，mouseup鼠标松开时触发
// 移动后鼠标位置 - 鼠标初始位置 = 移动后目标元素位置 - 目标元素位置
// 移动后目标元素位置 = dis + 目标元素初始位置
// 2）代码实现
// part1: 准备工作
// var autumn = document.querySelector('.autumn')
var startX = 0
var startY = 0
var sourceX = 0
var sourceY = 0
// part2: 功能函数
// function getTransform() {}
// function getStyle() {}
// function getTargetPos() {}
// function setTargetPos() {}
// part3: 声明三个事件回调
autumn.addEventListener('mousedown', start, false)
function start(event) {
    // 获取鼠标开始位置
    startX = event.pageX
    startY = event.pageY
    // 获取元素开始位置
    var pos = getTargetPos(autumn)
    sourceX = pos.x
    sourceY = pos.y
    // 绑定
    document.addEventListener('mousemove', move, false)
    document.addEventListener('mouseup', end, false)
}

function move(event) {
    // 获取鼠标当前位置
    var currentX = event.pageX
    var currentY = event.pageY
    // 计算差值
    var distanceX = currentX - startX
    var distanceY = currentY - startY
    // 计算并设置元素当前位置
    setTargetPos(autumn, {
        x: (sourceX + distanceX).toFixed(),
        y: (sourceY + distanceY).toFixed()
    })
}

function end(event) {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', end)
    // do other things
}

// html
// <div class="autumn" style="width:100px;height:100px;background-color:pink"></div>

// 至此，一个简单的拖拽就实现了