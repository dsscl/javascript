// var声明的变量，分别会经历2个步骤，首先给变量赋值一个undefined（执行环境创建阶段），并将整个操作提升到作用域的前面。
var a = 20
// 等同于
var a = undefined
a = 20

// 但是当通过let/const声明变量时，其实提升的操作仍然存在，但是并不会给这个变量赋值为undefined
// 即声明虽然提前了，但是该变量没有任何引用，所以当进行如下操作时，会报referenceError，即引用错误
console.log(a) // ReferenceError: a is not defined
let a = 20

// 由于不会默认赋值为undefined，加上let/const存在自己的作用域，因此会出现一个叫做暂时性死区的现象，例如“
var a = 20
if(true) {
    console.log(a) // ReferenceError: a is not defined
    let a = 30
}

// 一般来说，声明一个引用可以被改变的变量时用let，声明一个引用不能被改变的变量时用const，例如：
let a = 20
a = 30
// 注意，a值改变的原因，是引用改变了
const PI = 3.1415
const MAX_LENGTH = 100
PI = 3 // Uncaught TypeError...

// 除此之外，当声明一个引用类型的数据时，也会使用const。尽管可能会改变该数据的值，但是必须保持它的引用不变
const a = []
a.push(1)
console.log(a) // [1]

const b = {}
b.max = 20
b.min = 0
console.log(b) // {max: 20, min: 0}

// 思考一下下面的例子能不能用？
const arr = [1,2,3,4]
arr.forEach(function(item) {
    const temp = item + 1
    console.log(temp)
})
