import * as type from './mutation_type'
import { GetHosList, GetSectionList, GetCommonSectionList } from '@/request'

export default {
  [type.REMOTE_LOADING] (state, val) {
    state.remoteloading0 = val
  },

  // 医联体
  [type.REQUEST_UNIONLIST] (state, obj) {
    state.unions = obj.unions
  },

  // 医院
  [type.REQUEST_HOSPLIST] (state, obj) {
    state.hospitals = obj.hospitals
  },
  [type.REMOTE_HOSPLIST] (state, query) {
    state.remoteloading0 = false
    GetHosList({keyword: query})
    .then(res => {
      state.hospitals = res.data.ret_data
    })
  },

  // 实际科室
  [type.REQUEST_DEPTLIST] (state, obj) {
    state.departments = obj.departments
  },
  [type.REMOTE_DEPTLIST] (state, obj) {
    state.remoteloading0 = false
    // let type = 0
    // if (obj.hosid !== 0 && state.departments.length > 0 && state.departments[0].sectiontype === 1) {
    //   type = 1
    // }
    GetSectionList({hosid: obj.hosid, keyword: obj.query, gettype: 1})
    .then(res => {
      state.departments = res.data.ret_data
    })
  },

  // 标准科室
  [type.REQUEST_COMMONSECTIONLIST] (state, obj) {
    state.commonSection = obj.commonSection
  },
  [type.REMOTE_COMMONSECTIONLIST] (state, obj) {
    state.remoteloading0 = false
    GetCommonSectionList({hosid: 0, keyword: obj.query})
    .then(res => {
      state.commonSection = res.data.ret_data
    })
  },

  [type.REQUEST_OTHERLIST] (state, obj) {
    if (obj.item === 4) {
      state.clinicalranks = obj.otherlist
    } else if (obj.item === 5) {
      state.teachingranks = obj.otherlist
    } else if (obj.item === 7) {
      state.educations = obj.otherlist
    } else if (obj.item === 19) {
      state.pathologies = obj.otherlist
    }
  }
}
