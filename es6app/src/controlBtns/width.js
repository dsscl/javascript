/**
 * 控制目标元素宽度变化的模块
 */

import { getState, setState } from '../state'

const red_btn = document.querySelector('.width_reduce')
const add_btn = document.querySelector('.width_add')

red_btn.addEventListener('click', () => {
    const cur = Number(getState('width'))
    if(cur > 50) {
        setState('width', cur - 5)
    }
}, false)

add_btn.addEventListener('click', () => {
    const cur = Number(getState('width'))
    if(cur < 400) {
        setState('width', cur + 5)
    }
}, false)