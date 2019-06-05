// 可以通过export提供对外接口
// module01.js
export const name1 = 'TOM'
export const name2 = 'Jake'

// 引入某一个接口
import { name1 } from './module01'
// 引入该模块所有对外接口
import { name1, name2 } from './module01'
import * as module01 from './module01'
// 那么就有
name1 = module01.name1
name2 = module01.name2

// 还可以通过export default来对外提供接口，这种情况，对外接口通常是一个对象
const name1 = 'TOM'
const name2 = 'Jake'
export default {
    name1,
    name2
}
// 引入模块
import module01 from './module01' // module01就是export default抛出的对象

// module02.js
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    getName() {
        return this.name
    }
}
export default Person
// 引入模块
import Person from './module02'
const p1 = new Person('Tom', 20)
console.log(p1.getName())

// 一个模块只允许出现一次export default命令，但可以同时拥有多个export与一个export default并存
// module03.js
export function fn() {
    console.log('this is a function named fn.')
}
export function bar() {
    console.log('hello everybody.')
}
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    getName() {
        return this.name
    }
}
export default Person
// 引入模块
import Person, { fn } from './module03'
// 当然也可以全部引用，实践中通常不会这样做
import * as module03 from './module03'
// module03的内容如下
module03 = {
    fn: fn,
    bar: bar,
    default: Person
}