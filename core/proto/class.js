// es5
// 构造函数
function Person(name, age) {
    this.name = name
    this.age = age
}
// 原型方法
Person.prototype.getName = function() {
    return this.name
}

// es6
class Person {
    constructor(name, age) { // 构造函数
        this.name = name
        this.age = age
    }
    getName() { // 原型方法
        return this.name
    }
}

// 在实际使用中的几种不同写法
class Person {
    constructor(name, age) { // 构造函数
        this.name = name
        this.age = age
    }
    getName() { // 原型方法
        return this.name
    }

    static a = 20 // 等同于Person.a = 20

    c = 20 // 表示在构造函数中添加属性，在构造函数中等同于this.c = 20

    // 箭头函数的写法表示在构造函数中添加方法，在构造函数中等同于this.
    getAge = function() {}
    getAge = () => this.age
}