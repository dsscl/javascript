import * as type from './mutation_type'

import { GetUnionList, GetHosList, GetSectionList, GetSysDicList, GetCommonSectionList } from '@/request'

// 请求医联体列表
export const requestUnionlist = ({ commit }) => {
  return new Promise((resolve, reject) => {
    GetUnionList()
    .then(res => {
      let unions = res.data.ret_data
      commit(type.REQUEST_UNIONLIST, {unions})
      resolve()
    })
  })
}

// 请求医院列表
export const requestHosplist = ({ commit }) => {
  return new Promise((resolve, reject) => {
    GetHosList()
    .then(res => {
      let hospitals = res.data.ret_data
      commit(type.REQUEST_HOSPLIST, {hospitals})
      resolve()
    })
  })
}

// 远程搜索医院列表
export const remoteHosplist = ({ commit }, val) => {
  commit(type.REMOTE_LOADING, true)
  setTimeout(() => {
    commit(type.REMOTE_HOSPLIST, val)
  }, 200)
}

// 请求实际科室列表
export const requestDeptlist = ({ commit }, obj) => {
  return new Promise((resolve, reject) => {
    // 1获取实际科室列表
    GetSectionList({hosid: obj.hosid, gettype: 1})
    .then(res => {
      let departments = res.data.ret_data
      commit(type.REQUEST_DEPTLIST, {departments})
      resolve()
    })
  })
}
// export const requestDeptlist = ({ commit }, obj) => {
//   return new Promise((resolve, reject) => {
//     let departments
//     if (obj.type === 1) {
//       // 1获取实际科室列表
//       GetSectionList({hosid: obj.hosid, gettype: 1})
//       .then(res => {
//         departments = res.data.ret_data
//         commit(type.REQUEST_DEPTLIST, {departments})
//         resolve()
//       })
//     } else {
//       // 0先获取实际科室，返回空时获取所有标准科室
//       GetSectionList({hosid: obj.hosid, gettype: 0})
//       .then(res => {
//         departments = res.data.ret_data
//         commit(type.REQUEST_DEPTLIST, {departments})
//         resolve()
//       })
//     }
//   })
// }

// 远程搜索实际科室列表
export const remoteDeptlist = ({ commit }, obj) => {
  commit(type.REMOTE_LOADING, true)
  setTimeout(() => {
    commit(type.REMOTE_DEPTLIST, obj)
  }, 200)
}

// 请求标准科室列表
export const requestCommonSectionList = ({ commit }) => {
  return new Promise((resolve, reject) => {
    GetCommonSectionList({hosid: 0}).then(res => {
      let commonSection = res.data.ret_data
      commit(type.REQUEST_COMMONSECTIONLIST, {commonSection})
      resolve()
    })
  })
}

// 远程搜索标准科室列表
export const remoteCommonSectionList = ({ commit }, obj) => {
  commit(type.REMOTE_LOADING, true)
  setTimeout(() => {
    commit(type.REMOTE_COMMONSECTIONLIST, obj)
  }, 200)
}

// 请求职称、学历列表
export const requestOtherlist = ({ commit }, item) => {
  return new Promise((resolve, reject) => {
    GetSysDicList({catalog: item})
    .then(res => {
      let otherlist = []
      if (item === 19) {
        for (let i = 0; i < res.data.ret_data.length; i++) {
          otherlist.push({
            key: res.data.ret_data[i].value,
            value: res.data.ret_data[i].name,
            ischecked: false
          })
        }
      } else {
        otherlist = res.data.ret_data
      }
      commit(type.REQUEST_OTHERLIST, {item, otherlist})
      resolve()
    })
  })
}
