/**
 * 功能函数模块
 */

// 获取DOM元素属性
export const getStyle = (obj, key) => {
    return obj.currentStyle ? obj.currentStyle[key] : document.defaultView.getComputedStyle(obj, false)[key]
}