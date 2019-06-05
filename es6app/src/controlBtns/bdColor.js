/**
 * 控制目标元素边框颜色变化的模块
 */

import { setState } from '../state'

const input = document.querySelector('.bdcolor_input')
const btn = document.querySelector('.bdcolor_btn')

btn.addEventListener('click', () => {
    if(input.value) {
        setState('borderColor', input.value)
    }
}, false)