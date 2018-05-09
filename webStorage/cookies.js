import Cookies from 'js-cookie'

// cookies设置token
export function getToken () {
  return Cookies.get('token')
}

export function setToken (token) {
  return new Promise((resolve, reject) => {
    if (getExpires()) {
      let time = new Date(getExpires())
      Cookies.set('token', token, {expires: time, path: '/'})
      resolve()
    } else {
      Cookies.set('token', token)
      resolve()
    }
  })
}

export function removeToken () {
  return new Promise((resolve, reject) => {
    Cookies.remove('token')
    resolve()
  })
}

// cookies设置登入管理系统的回调地址
export function getCallbackurl () {
  return Cookies.get('callbackurl')
}

export function setCallbackurl (url) {
  return new Promise((resolve, reject) => {
    // Cookies.set('callbackurl', decodeURIComponent(url))
    Cookies.set('callbackurl', url)
    resolve()
  })
}

export function removeCallbackurl () {
  return new Promise((resolve, reject) => {
    Cookies.remove('callbackurl')
    resolve()
  })
}

// cookies设置token的有效期
export function getExpires () {
  return Cookies.get('expires')
}

export function setExpires (val) {
  return new Promise((resolve, reject) => {
    // 将token的有效期，保存至cookies，并给它设置个10天的有效期
    let time = new Date()
    time.setTime(time.getTime() + 10 * 24 * 60 * 60 * 1000)
    Cookies.set('expires', val, {expires: time, path: '/'})
    resolve()
  })
}

export function removeExpires () {
  return new Promise((resolve, reject) => {
    Cookies.remove('expires')
    resolve()
  })
}

// cookies设置用户权限
export function getPermission () {
  return Cookies.get('permission')
}

export function setPermission (obj) {
  return new Promise((resolve, reject) => {
    Cookies.set('permission', obj)
    resolve()
  })
}

export function removePermission () {
  return new Promise((resolve, reject) => {
    Cookies.remove('permission')
    resolve()
  })
}
