// 异步与同步
// 同步是指当发起一个请求时，如果未得到结果，代码将会等待，知道结果出来，才会执行后面的代码
// 异步是指当发起一个请求时，不会等待请求结果，而是直接继续执行后面的代码
// 利用promise模拟一个发起请求的函数
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(30)
        }, 1000)
    })
}
// 在该函数基础上，用async/await模拟同步的效果
var foo = async function() {
    var t = await fn()
    console.log(t)
    console.log('next code')
}
foo()
// 30
// next code
// 而异步效果则会有不同的输出结果
var foo = function() {
    fn().then(function(resp) {
        console.log(resp)
    })
    console.log('next code')
}
// next code
// 30

// 下面学习Promise与async/await的具体作用和使用方法


