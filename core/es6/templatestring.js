// 模板字符串
// es5
var a = 20
var b = 30
var string = a + '+' + b + '=' + (a+b)
// es6
const a = 20
const b = 30
const string = `${a} + ${b} = ${a+b}`

// 解析结构
var tom = {
    name: 'TOM',
    age: 20,
    gender: 1,
    job: 'student'
}
// es5
var name = tom.name
var age = tom.age
var gender = tom.gender
var job = tom.job
// es6
const { name, age, gender, job } = tom

// 展开运算符 '...'
const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5, 6] // [1, 2, 3, 4, 5, 6]