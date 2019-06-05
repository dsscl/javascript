class Person {
    constructor(name, age) { // 构造函数
        this.name = name
        this.age = age
    }
    getName() { // 原型方法
        return this.name
    }
}

// Student类继承Person类
class Student extends Person {
    constructor(name, age, gender, classes) {
        super(name, age)
        this.gender = gender
        this.classes = classes
    }
    getGender() {
        return this.gender
    }
}
const s = new Student('TOM', 20, 1, 3)
s.getName() // TOM
s.getGender() // 1

// 构造函数中
// es6
super(name, age)
// es5
Person.call(this)