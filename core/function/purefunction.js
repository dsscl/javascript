// 纯函数
var source = [1, 2, 3, 4, 5]
source.slice(1, 3) // 纯函数返回[2, 3]， source不变
source.splice(1, 3) // 不纯的函数返回[2, 3, 4]，source被改变

source.pop() // 不纯的
source.push(6) // 不纯的
source.shift() // 不纯的
source.unshift() // 不纯的
source.reverse() // 不纯的

var source = [1, 2, 3, 4, 5]
source.concat([6, 7]) // 纯函数返回[1, 2, 3, 4, 5, 6, 7]，source不变
source.join('-') // 纯函数返回1-2-3-4-5，source不变

// 纯函数还有一个重要的特点，那就是除传入参数外，不依赖任何外界的信息与状态
var name = 'Jake'
function sayHello() {
    return 'Hello, ' + name
}
sayHello() // Hello, Jake
name = 'Tom'
sayHello // Hello, Tom
// 改为纯函数
function sayHello(name) {
    return 'Hello, ' + name
}
sayHello('Jake') // Hello, Jake
sayHello('Tom') // Hello, Tom

// 纯函数的特性：
// 1）可移植性，一次封装，多处使用
// 例：获取url中?拼接的参数
function getParams(url, param) {
    if(!/\?/.test(url)) {
        return null
    }
    var search = url.split('?')[1]
    var array = search.split('&')
    for(var i=0; i<array.length; i++) {
        var tmp = array[i].split('=')
        if(tmp[0] === param) {
            return decodeURIComponent(tmp[1])
        }
    }
    return null
}
// getParams非完全健壮，但足以体现可移植性的特点
// 2）可缓存性：相同的输入总能得到相同的输出
// 例：传入日期，获取当天数据，然后利用纯函数缓存
function process(date) {
    var result = ''
    // 复杂的处理过程...
    return result
}
function withProcess(base) {
    var cache = {}
    return function() {
        var date = arguments[0]
        if(cache[date]) {
            return cache[date]
        }
        return base.apply(base, arguments)
    }
}
var _process = widthProcess(process)
// 如果数据存在，就返回缓存中的数据；如果不存在，则调用process方法重新获取
_process('2017-06-03')
_process('2017-06-04')
_process('2017-06-05')
_process('2019-06-06') // note date

