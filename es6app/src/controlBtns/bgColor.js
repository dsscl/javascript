/**
 * 控制目标元素背景颜色变化的模块
 */

import { setState } from '../state'

const input = document.querySelector('.bgcolor_input')
const btn = document.querySelector('.bgcolor_btn')

btn.addEventListener('click', () => {
    if(input.value) {
        setState('backgroundColor', input.value)
    }
}, false)