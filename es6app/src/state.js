/**
 * 状态管理模块
 */

// 保存状态值
const store = {
    // show: 0,
    // backgroundColor: '#ccc',
    // width: '200',
    // height: '200'
}

// 往store中添加一个状态值
export const registerState = (status, value) => {
    if(store[status]) {
        throw new Error('状态已经存在')
        return
    }
    store[status] = value
    return value
}

// 获取整个状态树
export const getStore = () => store

// 获取某个状态的值
export const getState = status => store[status]

// 设置某个状态的值
export const setState = (status, value) => {
    store[status] = value
    dispatch(status, value)
    return value
}

// 还需要一个events对象来保存UI函数，与状态值一一对应
const events = {
    // show: function() {},
    // backgroundColor: function() {},
    // width: function() {},
    // height: function() {}
}

// 将状态值与事件绑定在一起，通过status-events的形式保存在events对象中

// UI方法可以理解为一个绑定的过程，因此命名为bind，在有的地方也成为订阅
export const bind = (status, eventFn) => {
    events[status] = eventFn
}

// 移除绑定
export const remove = status => {
    events[status] = null
    return status
}

// 需要在状态值改变时触发UI的变化，因此在setState方法中调用了该方法
export const dispatch = (status, value) => {
    if(!events[status]) {
        throw new Error('未绑定任何事件')
    }
    events[status](value)
    return value
}

// 至此，一个简单的状态管理模块就完成了，接下来看如何运用它
