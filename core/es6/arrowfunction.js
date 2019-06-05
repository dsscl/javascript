// 基本用法
// es5
var fn = function(a, b) {
    return a + b
}
// es6
const fn = (a, b) => a + b

// es5
var foo = function() {
    var a = 20
    var b = 30
    return a + b
}
// es6
const foo = () => {
    const a = 20
    const b = 30
    return a + b
}
// 注意，箭头函数只能替换函数表达式，即使用var/let/const声明的变量
// 直接使用function声明的函数是不能使用箭头函数替换的

// 函数内部的this指向，与它的调用者有关，或者使用call/apply/bind也可以修改内部的this指向
var name = 'TOM'
var getName = function() {
    console.log(this.name)
}
var person = {
    name: 'Alex',
    getName: getName
}
var other = {
    name: 'Jone'
}
getName() // 独立调用，this指向undefined，并自动转向window
person.getName() // 被person调用，this指向person
getName.call(other) // call修改this，指向other

// 当最初声明的getName方法修改为箭头函数的形式后，输出的结果有何变化？
var getName = () => {
    console.log(this.name)
}
// 其他不变
// 发现结果三次调用都输出了TOM
// 箭头函数中的this，就是声明函数时所处上下文中的this，它不会被其他方式所改变

// 实践中，常常会遇到this在传递过程中发生改变，例如
var Mot = function(name) {
    this.name = name
}
Mot.prototype = {
    constructor: Mot,
    do: function() {
        console.log(this.name)
        document.onclick = function() {
            console.log(this.name)
        }
    }
}
new Mot('Alex').do()
// 希望do方法返回“Alex”，但在onclick回调函数中，this指向发生了变化，指向了document，因此得不到我们想要的结果，改为如下即可
var Mot = function(name) {
    this.name = name
}
Mot.prototype = {
    constructor: Mot,
    do: function() {
        console.log(this.name)
        document.onclick = () => {
            console.log(this.name)
        }
    }
}
new Mot('Alex').do()

// 除此之外，箭头函数中，没有arguments对象
var add = function(a, b) {
    console.log(arguments)
    return a + b
}
add(1, 2)
// 结果输出一个类数组对象
/*[
    0: 1,
    1: 2,
    length: 2,
    callee: f(a, b),
    Symbol(Symbol.iterator): f values()
] */
var add = (a, b) => {
    console.log(arguments)
    return a + b
}
add(1, 2) // arguments is not defined