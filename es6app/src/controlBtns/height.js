/**
 * 控制目标元素高度变化的模块
 */

import { getState, setState } from '../state'

const red_btn = document.querySelector('.height_reduce')
const add_btn = document.querySelector('.height_add')
const height_input = document.querySelector('.height_input')

height_input.value = getState('height') || 100

red_btn.addEventListener('click', () => {
    const cur = Number(getState('height'))
    if(cur > 50) {
        setState('height', cur - 5)
        height_input.value = cur - 5
    }
}, false)

add_btn.addEventListener('click', () => {
    const cur = Number(getState('height'))
    if(cur < 400) {
        setState('height', cur + 5)
        height_input.value = cur + 5
    }
}, false)