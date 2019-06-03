// 将构造函数以参数的形式传入
function New(func) {
    var res = {} // 声明一个中间对象，该对象为最终返回的实例
    if(func.prototype !== null) {
      res.__proto__ = func.prototype // 将实例的原型指向构造函数的原型
    }

    var ret = func.apply(res, Array.prototype.slice.call(arguments, 1)) // 将构造函数内部的this指向修改为指向res，即实例对象

    // 如果在构造函数中明确指定了返回对象时，new的执行结果就是该返回对象
    if((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
      return ret
    }

    return res
  }

  var Person = function(name) {
    this.name = name
  }
  Person.prototype.getName = function() {
    return this.name
  }

  var p1 = New(Person, 'Jake')
  var p2 = New(Person, 'Tom')

  console.log(p1.getName())
  console.log(p2.getName())

//   使用New方法声明的实例与new关键字声明的实例拥有同样的能力与特性，
//   因此，通过对New方法的封装，我们知道new关键字在创建实例时经历了如下过程：
// 1）先创建一个新的、空的实例对象
// 2）将实例对象的原型，指向构造函数的原型
// 3）将构造函数内部的this，修改为指向实例
// 4）最后返回改实例对象

// PPrototypr指代原型对象，构造函数、原型、实例之间有如下关系：
// Person.prototype -> PPrototypr
// p1.__proto__ -> PPrototypr
// p2.__proto__ -> PPrototypr
// PPrototypr.constructor -> Person

// 可以用in来判断一个对象是否拥有某一个方法/属性，无论该方法/属性是否公有
console.log('name' in p1)  // true

// 常常用in的这种特性来判断当前页面所处的环境是否在移动端
var isMobile = 'ontouchstart' in document