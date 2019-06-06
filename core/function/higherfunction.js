// 数组map方法封装的思考过程
// this指向map的第二个参数
var arr = [1,2,3,4]
var newArr = arr.map(function(item, i, arr) {
    console.log(item, i, arr, this)
    return item + 1
}, {a: 1})

// 1 0 (4) [1, 2, 3, 4] {a: 1}
// 2 1 (4) [1, 2, 3, 4] {a: 1}
// 3 2 (4) [1, 2, 3, 4] {a: 1}
// 4 3 (4) [1, 2, 3, 4] {a: 1}

newArr // [2, 3, 4, 5]

// 利用for循环封装map函数
Array.prototype._map = function(fn, context) {
    // 首先定义一个数组来保存每一项的运算结果，最后返回
    var temp = []
    if(typeof fn == 'function') {
        var k = 0
        var len = this.length
        // 封装for循环的过程
        for(;k<len;k++) {
            // 将每一项的运算操作丢进fn里
            // 利用call方法指定fn的this指向与具体参数
            temp.push(fn.call(context, this[k], k, this))
        }
    } else {
        console.error('TypeError: ' + fn + ' is not a function.')
    }
    // 返回每一项运算结果组成的新数组
    return temp
}
var newArr = [1,2,3,4]._map(function(item) {
    return item + 1
})
// [2,3,4,5]

// 上例中，我们封装的是一个数组的for循环过程，虽然无法确定在for循环中到底会做什么事情，但是可以确定它们一定会使用for循环
// 因此我们把“都会使用for循环”这个公共逻辑封装起来，而具体要做什么事情，则以一个函数作为参数的形式，让使用者自定义
// 这个被作为参数传入的函数，就可以称之为基础函数，而我们封装的map方法，就可以称之为高阶函数

// 高阶函数的使用思路正在于此，它其实是一个封装公共逻辑的过程

// 假设我们正在做一个音乐社区的项目，在进入这个项目的每一个页面时，都必须判断当前用户是否已经登录。因为登录与未登录所展示的页面有很多差异
// 不仅如此，在确认用户登录之后，还需得到用户的具体信息，如昵称、姓名、VIP等级、权限范围等
// 因此用户状态的判断逻辑，是每个页面都必须要做的一个公共逻辑，那么在学习了高阶函数之后，我们就可以用高阶函数来做这件事情
// 继续用模块化的方式来完成这个demo，根据现有知识，我们可以利用自执行函数来划分模块

// 首先需要一个高阶函数来专门处理获取用户状态的逻辑，因此可以将这个高阶函数封装为一个独立的模块
// 高阶函数withLogin，用来判断当前用户状态
(function() {
    // 用随机数的方式来模拟一个获取用户信息的方法
    var getLogin = function() {
        var a = parseInt(Math.random() * 10).toFixed(0)
        if(a % 2 == 0) {
            return { login: false }
        }
        return {
            login: true,
            userinfo: {
                nickname: 'jake',
                vip: 11,
                userid: '666666'
            }
        }
    }

    var widthLogin = function(basicFn) {
        var loginInfo = getLogin()
        // 将loginInfo以参数的形式传入到基础函数中
        return basicFn.bind(null, loginInfo)
    }

    window.widthLogin = widthLogin
})

// 假设我们要展示主页，则可以通过renderIndex的方法来渲染
// 渲染主页模块
(function() {
    var widthLogin = window.widthLogin
    var renderIndex = function(loginInfo) {
        // 这里处理index页面的逻辑
        if(loginInfo.login) {
            // 处理登录之后的逻辑
        } else {
            //处理未登录的逻辑
        }
    }

    // 对外暴露接口时，使用高阶函数包一层，来判断当前页面的登录状态
    window.renderIndex = widthLogin(renderIndex)
})()

// 同理，渲染个人主页时，可以用renderPersonal方法
(function() {
    var widthLogin = window.widthLogin
    var renderPersonal = function(loginInfo) {
        // 这里处理index页面的逻辑
        if(loginInfo.login) {
            // do something
        } else {
            //do other something
        }
    }
    window.renderPersonal = widthLogin(renderPersonal)
})()

// 最后，在合适的时机使用这些渲染函数即可
(function() {
    window.renderIndex()
})()


// 柯里化
// 高阶函数的一种特殊用法
// 柯里化是指这样一个函数（假设叫作createCurry），它接收函数A作为参数，运行后能够返回一个新的函数，并且这个新的函数能够处理函数A的剩余参数
function A(a, b, c) {
    // do something
}
// 假设有一个封装好了的柯里化通用函数createCurry，它接收bar作为参数，能够将A转化为柯里化函数，返回结果就是这个函数被转化之后的函数
var _A = createCurry(A)
// 那么_A作为createCurry运行的返回函数，能够处理A的剩余参数。因此下面的运行结果都是等价的
_A(1, 2, 3)
_A(1, 2)(3)
_A(1)(2, 3)
_A(1)(2)(3)
_A(1, 2, 3)
// 函数A被createCurry转化之后得到柯里化函数_A，_A能够处理A的所有剩余参数，因此柯里化也被称为部分求值
function add(a, b, c) {
    return a + b + c
}
function _add(a) {
    return function(b) {
        return function(c) {
            return a + b + c
        }
    }
}
add(1, 2, 3)
_add(1)(2)(3)

// 柯里化函数的运行过程其实是一个参数的收集过程，我们将每一次传入的参数收集起来，并在最里层进行处理
// 利用这个思路对将createCurry封装

// arity用来标记剩余参数的个数
// args用来收集参数
function createCurry(func, arity, args) {
    // 第一次执行时，并不会传入arity，而是直接获取func参数的个数func.length
    var arity = arity || func.length

    // 第一次执行也不会传入args，而是默认为空数组
    var args = args || []

    var wrapper = function() {
        // 将wrapper中的参数收集到args中
        var _args = Array.prototype.slice.call(arguments)
        Array.prototype.push.apply(args, _args)

        // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
        if(_args.length < arity) {
            arity -= _args.length
            return createCurry(func, arity, args)
        }

        // 参数收集完毕，执行func
        return func.apply(func, args)
    }
    return wrapper
}
// 柯里化确实吧简单的问题复杂化了，但在复杂化的同时，我们在使用函数时拥有了更多的自由度。对于函数参数的自由处理，正是柯里化的核心所在

// 验证一串数字是否是正确的手机号
function checkPhone(phoneNumber) {
    return /^1[34578]\d{9}$/.test(phoneNumber)
}
// 如果想要验证邮箱呢
function checkEmail(email) {
    return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)
}
// 验证身份证号，密码...
// 封装一下
function check(reg, targetString) {
    return reg.test(targetString)
}
// 又会遇到问题，因为总是需要输入一串正则表达式，导致使用时效率低下
check(/^1[34578]\d{9}$/, '14900000088')
check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, 'test@163.com')
// 这个时候就要借助柯里化，在check的基础上再做一层封装，以简化使用
var _check = createCurry(check)
var checkPhone = _check(/^1[34578]\d{9}$/)
var checkEmail = _check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)
// 最后使用的时候就变得更加简洁直观了
checkPhone('14900000088')
checkEmail('test@163.com')

// 例：在map函数的基础上，进行二次封装。将数组的每一项转化为百分比
function getNewArray(array) {
    return array.map(function(item) {
        return item * 100 + '%'
    })
}
getNewArray([1,2,3,0.12]) // ['100%', '200%', '300%', '12%']
// 借助柯里化来二次封装
function _map(func, array) {
    return array.map(func)
}
var _getNewArray = createCurry(_map)
var getNewArray = _getNewArray(function(item) {
    return item * 100 + '%'
})

// 例：借助柯里化过滤数组中所有Number类型的数据
function _filter(func, array) {
    return array.filter(func)
}
var _find = createCurry(_filter)
var findNumber = _find(function(item) {
    if(typeof item == 'number') {
        return item
    }
})
findNumber([1,2,3,'2','3',4]) // [1,2,3,4]

// 继续封装另外的过滤操作就会变得非常简单
// 找出数字为20的子项
var find20 = _find(function(item, i) {
    if(item === 20) {
        return i
    }
})
find20([1,2,3,30,20,100]) // 4

// 找出数组中大于100的所有数据
var findGreater100 = _find(function(item) {
    if(item > 100) {
        return item
    }
})
findGreater100([1,2,101,300,2,122]) // [101, 300, 122]

// 以上例子较为简单，柯里化思维能够帮助应对更复杂的情况
// 提升了自由度的同时，柯里化通用式里调用了arguments对象，使用了递归与闭包，牺牲了一部分性能



// 无限参数的柯里化
// 前端面试题：实现一个add方法，使计算结果能够满足如下预期
add(1)(2)(3) = 6
add(1,2,3)(4) = 10
add(1)(2)(3)(4)(5) = 15

// 难点在于参数不固定，不知道函数会执行几次，因此不能用前面封装的createCurry通用公式来转换一个柯里化函数，只能自己封装
// 补充知识点：函数的隐式转换——当函数直接参与其他计算时，函数会默认调用toString方法，直接将函数体转换为字符串参与计算
function fn() { return 20 }
console.log(fn + 10) // 输出结果 function fn() { return 20 }10
// 可以重写toString方法，
fn.toString = function() { return 20 }
console.log(fn + 10) // 30
// 除此之外，重写函数的valueOf方法时也能改变函数的隐式转换结果
fn.valueOf = function() { return 60 }
console.log(fn + 10) // 70
// 当同时重写函数的toString方法与valueOf方法时，最终的结果会取valueOf方法返回的结果
function fn() { return 20 }
fn.toString = function() { return 20 }
fn.valueOf = function() { return 60 }
console.log(fn + 10) // 70

// 继续上题
// add方法的实现仍然是一个收集参数的过程。当add函数执行到最后时，返回的仍然是一个函数，但是我们可以通过定义toString/valueOf的方式，让这个函数可以
// 直接参与计算，并且转换的结果是我们想要的，而且他本身也仍然可以继续接受新的参数
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments)
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var adder = function() {
        var _adder = function() {
            // [].push.apply(_args, [].slice.call(arguments))
            _args.push(...arguments)
            return _adder
        }
        // 利用隐式转换的特性，当最后执行时隐式转换，计算最终的值并返回
        _adder.toString = function() {
            return _args.reduce(function(a, b) {
                return a + b
            })
        }
        return _adder
    }
    // return adder.apply(null, _args)
    return adder(..._args)
}

var a = add(1)(2)(3)(4) // f 10
var b = add(1, 2)(3)(4) // f 10
var c = add(1, 2, 3)(4) // f 10
var d = add(1, 2, 3, 4) // f 10

// 可以利用隐式转换的特性参与计算
console.log(a + 10) // 20
console.log(b + 20) // 30
console.log(c + 30) // 40
console.log(d + 40) // 50

// 也可以继续传入参数，得到的结果再次利用隐式转换参与计算
console.log(a(10) + 100) // 120
console.log(b(10) + 100) // 120
console.log(c(10) + 100) // 120
console.log(d(10) + 100) // 120


// 代码组合
// 之前通过封装，可以直接从参数中得到用户的登录状态
window.renderIndex = widthLogin(renderIndex)
// 新增需求：不仅需要判断用户的登录状态，还需要判断用户打开当前页面所处的具体环境：是在某一个App打开，还是在移动端打开，或PC端的某一个浏览器打开
// 不同的环境要做不同的处理
// 根据高阶函数的用法，还需要封装一个新的高阶函数withEnvironment来处理这个统一的环境判断逻辑
(function() {
    var env = {
        isMobile: false,
        isAndroid: false,
        isIOS: false
    }
    var ua = navigator.userAgent
    env.isMobile = 'ontouchstart' in document
    env.isAndroid = !!ua.match(/android/)
    env.isIOS = !!ua.match(/iphone/)

    var withEnvironment = function(basicFn) {
        return basicFn.bind(null, env)
    }

    window.withEnvironment = withEnvironment
})()

// 正常情况下，使用这个高阶函数一般：
window.renderIndex = withEnvironment(renderIndex)
// 但现在问题是，我们这里已经有两个高阶函数想要给基础函数renderIndex传递新能力了
// 因为在高阶函数的实现中使用了bind方法，因此withEnvironment(renderIndex)与renderIndex其实是拥有共同的函数体的
// 所以当遇到多个高阶函数时，也可以这样来使用
window.renderIndex = withLogin(withEnvironment(renderIndex))
// 又出现了多层嵌套的使用问题，可以使用组合的方式来解决，理想调用方式：
wondow.renderIndex = compose(withLogin, withEnvironment, renderIndex)
// 如何实现这个compose
function compose(...args) {
    var arity = args.length - 1
    var tag = false
    if(typeof args[arity] === 'function') {
        tag = true
    }
    if(arity > 1) {
        var param = args.pop(args[arity])
        arity--
        var newParam = args[arity].call(args[arity], param)
        args.pop(args[arity])
        // newParam是上一个参数的运行结果，我们可以打印看它的值
        args.push(newParam)
        console.log(newParam)
        return compose(...args)
    } else if(arity == 1) {
        // 将操作目标放在最后一个参数，目标可能是一个函数
        // 也可能是一个值，因此可针对不同的情况做不同的处理
        if(!tag) {
            return args[0].bind(null, args[1])
        } else {
            return args[0].call(null, args[1])
        }
    }
}
// 验证可靠性
var fn1 = function(a) { return a + 100 }
var fn2 = function(a) { return a + 10 }
var fn3 = function(a) { return a + 20 }

var bar = compose(fn1, fn2, fn3, 10)
console.log(bar)
// 30
// 40
// 140

var base = function() {
    return arguments[0] + arguments[1]
}
var foo1= function(fn) {
    return fn.bind(null, 20)
}
var foo2= function(fn) {
    return fn.bind(null, 30)
}
var res = compose(foo1, foo2, base)
console.log(res())
// f() {}
// 50

// 组合函数还可以借助柯里化封装变得更加灵活
wondow.renderIndex = compose(withLogin, withEnvironment, renderIndex)
// 还可以这样
wondow.renderIndex = compose(withLogin, withEnvironment)(renderIndex)

// 这里不再继续深入讨论具体的封装方法，我们可以在使用时借助工具库lodash.js中的flowRight来实现这种灵活的效果
// es6模块化语法，引入flowRight函数
import flowRight from 'lodash/flowRight'
// ...
// es6模块化语法，对外暴露接口
export default flowRight(withLogin, withEnvironment)(renderIndex)