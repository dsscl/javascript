import axios from 'axios'
import router from '@/router/'
import qs from 'qs'
import { logoutUrl } from '@/router'
import { getToken } from '@/util/cookies'
import { Message, MessageBox } from 'tesla-ui'

const appid = 'yhzxqd7e0187afeb16e57e4b47e3a92ef8d061'

var domainurl = ''
if (window.location.href.indexOf('https') !== -1) {
  // 测试
  domainurl = 'https://testuserplat.zwjk.com'
  // 预生产
  // domainurl = 'https://preuserplat.zwjk.com'
  // 生产
  // domainurl = 'https://userplat.zwjk.com'
} else {
  // 测试
  domainurl = 'http://test.userplat.zwjk.com'
  // 预生产
  // domainurl = 'http://preuserplat.zwjk.com'
  // 生产
  // domainurl = 'http://userplat.zwjk.com'
}
console.log(111, domainurl)

// 设置请求头headers
const headersParam = () => {
  var param = {}
  if (getToken()) {
    param = {
      'Content-Type': 'text/json;charset=UTF-8',
      'appid': appid,
      'token': getToken()
    }
  } else {
    param = {
      'Content-Type': 'text/json;charset=UTF-8',
      'appid': appid
    }
  }
  return param
}

// 请求异常处理
const errorText = error => {
  if (error.response && error.response.status === 401) {
    MessageBox.alert('用户登录异常，请重新登录！', '消息提示', {
      confirmButtonText: '确定',
      callback: () => {
        logoutUrl()
      }
    })
  } else {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误(400)'
        break
      case 403:
        error.message = '拒绝访问(403)'
        break
      case 404:
        error.message = '请求出错(404)'
        break
      case 405:
        error.message = '拒绝访问(405)'
        break
      case 408:
        error.message = '请求超时(408)'
        break
      case 500:
        error.message = '服务器错误(500)'
        break
      case 501:
        error.message = '服务未实现(501)'
        break
      case 502:
        error.message = '网络错误(502)'
        break
      case 503:
        error.message = '服务不可用(503)'
        break
      case 504:
        error.message = '网络超时(504)'
        break
      case 505:
        error.message = 'HTTP版本不受支持(505)'
        break
      default:
        error.message = '连接出错'
    }
    Message.error('Error：' + error.message)
  }
}

const post = (url, param, body) => axios.post(domainurl + url, body ? param : qs.stringify(param), {
  headers: { 'Content-Type': body ? (body === true ? 'application/json' : body.headers) : 'application/x-www-form-urlencoded' }
}).then(d => {
  if (d.data.code === 401) {
    router.push('/')
  }
  return d
}).catch(errorText)

// POST请求 (参数放在请求body中)
const commonPostBody = (url, param, type) => {
  return new Promise((resolve, reject) => {
    axios.post(domainurl + url, param, {
      headers: headersParam()
    }).then(res => {
      if (res.data.ret_code === 0) {
        resolve(res)
      } else {
        Message.error(res.data.ret_info)
        if (type === 1) {
          resolve()
        }
      }
    }).catch(errorText)
  })
}

// POST请求 (参数放在请求body中)
const commonPostBodyWithError = (url, param, type) => {
  return new Promise((resolve, reject) => {
    axios.post(domainurl + url, param, {
      headers: headersParam()
    }).then(res => {
      if (res.data.ret_code === 0) {
        Message.success(res.data.ret_info)
        resolve(res)
      } else {
        Message.error(res.data.ret_info)
        if (type === 1) {
          resolve(res)
        }
      }
    }).catch(errorText)
  })
}

// POST请求 (参数放在请求query中)
const commonPostQuery = (url, param, type) => {
  return new Promise((resolve, reject) => {
    axios(domainurl + url, {
      method: 'post',
      headers: headersParam(),
      params: param
    }).then(res => {
      if (res.data.ret_code === 0) {
        resolve(res)
      } else {
        Message.error(res.data.ret_info)
        if (type === 1) {
          resolve()
        }
      }
    }).catch(errorText)
  })
}

// GET请求 (参数放在请求query中)
const commonGet = (url, param, type) => {
  return new Promise((resolve, reject) => {
    axios(domainurl + url, {
      method: 'get',
      headers: headersParam(),
      params: param
    }).then(res => {
      if (res.data.ret_code === 0) {
        resolve(res)
      } else {
        Message.error(res.data.ret_info)
        if (type === 1) {
          resolve()
        }
      }
    }).catch(errorText)
  })
}

// ---------------- Common ----------------
// 获取数据字典值
export const GetSysDicList = (p) => commonGet('/api/DjCommon/GetSysDicList', p)

// 查询医院列表 根据条件返回前N条数据
export const GetHosList = (p) => commonGet('/api/DjCommon/GetHosList', p)

// 根据医院id查询科室列表
export const GetSectionList = (p) => commonGet('/api/DjCommon/GetSectionList', p)

// 获取通用科室列表
export const GetCommonSectionList = (p) => commonGet('/api/DjCommon/GetCommonSectionList', p)

// 获取医联体列表
export const GetUnionList = (p) => commonGet('/api/DjCommon/GetUnionList', p)

// 根据父编码获取区域信息
export const GetDistrictInfo = (p) => commonGet('/api/DjCommon/GetDistrictInfo', p)

// 发送短信验证码
export const SendVerifyCode = (p) => commonPostQuery('/api/DjCommon/SendVerifyCode', p)

// 获取扩展属性列表
export const GetExtPropertyInfo = (p) => commonGet('/api/DjCommon/GetExtPropertyInfo', p)

// ---------------- Doctor ----------------
// 获取用户模块权限数据
export const GetPlatMenu = (p) => commonGet('/api/Doctor/GetPlatMenu', p)

// 获取所有用户列表
export const GetAllUserList = (p) => commonPostBody('/api/Doctor/GetAllUserList', p)

// 获取用户信息
export const GetUserDocInfo = (p) => commonGet('/api/Doctor/GetUserDocInfo', p)

// 保存用户信息
export const SaveUserInfo = (p) => commonPostBody('/api/Doctor/SaveUserInfo', p, 1)

// 禁用启用用户
export const ChangeUserSate = (p) => commonPostQuery('/api/Doctor/ChangeUserSate', p)

// 用户重置密码
export const ResetUserPwd = (p) => commonPostBody('/api/Doctor/ResetUserPwd', p)

// 获取已锁定的用户列表
export const GetLockedUserList = (p) => commonPostBody('/api/Doctor/GetLockedUserList', p)

// 用户账号解锁
export const UnlockUser = (p) => commonGet('/api/Doctor/UnlockUser', p)

// 根据用户id获取用户医联体功能权限列表
export const GetUserUnionRoles = (p) => commonGet('/api/Doctor/GetUserUnionRoles', p)

// 根据用户id 及医联体id获取用户角色信息
export const GetUserRoleInfoByUnionId = (p) => commonGet('/api/Doctor/GetUserRoleInfoByUnionId', p)

// 保存用户权限
export const SaveUserRoleInfo = (p) => commonPostBody('/api/Doctor/SaveUserRoleInfo', p, 1)

// 根据医生ID、医联体ID、平台类型获取指定数量的专家列表
export const GetExpertListByNum = (p) => commonGet('/api/Doctor/GetExpertListByNum', p)

// 查询用户信息和医生信息是否已存在
export const UserDoctorExists = (p) => commonGet('/api/Doctor/UserDoctorExists', p)

// 删除用户和医生信息
export const DeleteUserDoctor = (p) => commonPostQuery('/api/Doctor/DeleteUserDoctor', p)

// ---------------- Hospital ----------------
// 获取医院列表(表格列表)
export const GetHosListForHos = (p) => commonPostBody('/api/Hospital/GetHosList', p)

// 获取医院详情
export const GetHosDetail = (p) => commonGet('/api/Hospital/GetHosDetail', p)

// 编辑新建医院
export const SaveHosInfo = (p) => commonPostBody('/api/Hospital/SaveHosInfo', p, 1)

// 删除医院
export const DelHos = (p) => commonGet('/api/Hospital/DelHos', p)

// 获取区域医院科室树结构数据
export const GetSectionTree = (p) => commonGet('/api/Hospital/GetSectionTree', p)

// 根据科室id获取科室详情
export const GetSectionById = (p) => commonGet('/api/Hospital/GetSectionById', p)

// 保存科室接口
export const SaveSection = (p) => commonPostBody('/api/Hospital/SaveSection', p)

// 获取上级科室
export const GetSectionByHosIdAndSectionType = (p) => commonGet('/api/Hospital/GetSectionByHosIdAndSectionType', p)

// 验证科室名是否可用
export const CheckSectionNameIsLegal = (p) => commonPostQuery('/api/Hospital/CheckSectionNameIsLegal', p)

// 删除科室信息
export const DisableSectionById = (p) => commonPostQuery('/api/Hospital/DisableSectionById', p)

// ---------------- Union ----------------
// 获取医联体列表(表格列表)
export const GetUnionListForUnion = (p) => commonPostBody('/api/Union/GetUnionList', p)

// 推荐一个医联体id
export const GetUnionIdBycode = (p) => commonGet('/api/Union/GetUnionIdBycode', p)

// 获取医联体详情
export const GetUnionDetail = (p) => commonPostQuery('/api/Union/GetUnionDetail', p)

// 操作医联体(禁用，删除，添加医联体)
export const OperateUnion = (p) => commonPostBody('/api/Union/OperateUnion', p, 1)

// // 导出医联体列表下的医院列表
// export const ExportUnionHospitalExecl = (p) => commonGet('/api/Union/ExportUnionHospitalExecl', p)

// 根据医联体id,与传过来的数据更改相关医联体的功能数据
export const EditUnionRoleFeatures = (p) => commonPostQuery('/api/Union/EditUnionRoleFeatures', p, 1)

// 获取某医联体下已有模块列表
export const GetAllPlatInfo = (p) => commonGet('/api/Union/GetAllPlatInfo', p)

// 获取所有模块
export const GetUnionmodelAllist = (p) => commonGet('/api/Union/GetUnionmodelAllist', p)

// 获取所有付费模块
export const GetUnionPaymodule = (p) => commonGet('/api/Union/GetUnionPaymodule', p)

// 获取收费模块下面的子模块
export const GetActypeandTemp = (p) => commonGet('/api/Union/GetActypeandTemp', p)

// 获取子模块的收费模板
export const GetTempDetail = (p) => commonGet('/api/Union/GetTempDetail', p)

// 设置医联体费用
export const SetupUnionfee = (p) => commonPostBody('/api/Union/SetupUnionfee', p)

// ---------------- User ----------------
// 用户登录
export const Login = (p) => commonPostBody('/api/DjUser/UserLogin', p, 1)

// 退出登录
export const Logout = (p) => commonPostBody('/api/DjUser/LogOut', p)

// 获取用户信息
export const GetUserInfo = (p) => commonGet('/api/DjUser/GetUserInfo', p)

// 获取模块功能点及数据权限
export const GetPermissions = (p) => commonGet('/api/DjUser/GetPermissions', p)

// 切换医联体信息
export const ChangeUnionInfo = (p) => commonPostQuery('/api/DjUser/ChangeUnionInfo', p)

// ---------------- UserLicense ----------------
// 获取认证列表
export const GetLicenseList = (p) => commonPostBody('/api/UserLicense/GetLicenseList', p)

// 获取认证信息（根据用户ID）
export const GetUserLicenseInfoByUserID = (p) => commonGet('/api/UserLicense/GetUserLicenseInfoByUserID', p)

// 审核认证信息
export const AuditLicenseInfo = (p) => commonPostBody('/api/UserLicense/AuditLicenseInfo', p, 1)

// 获取入驻列表
export const GetEnterList = (p) => commonPostBody('/api/UserLicense/GetEnterList', p)

// 获取用户入驻信息（根据用户ID）
export const GetUserEnterInfoByUserID = (p) => commonGet('/api/UserLicense/GetUserEnterInfoByUserID', p)

// 获取专家会诊列表（根据医生ID）
export const GetExpertServiceListByDoctorID = (p) => commonGet('/api/UserLicense/GetExpertServiceListByDoctorID', p)

// 保存专家开通服务信息
export const SaveExpertServices = (p) => commonPostBody('/api/UserLicense/SaveExpertServices', p)

// 审核入驻信息
export const AuditEnterInfo = (p) => commonPostBody('/api/UserLicense/AuditEnterInfo', p, 1)

// 用户入驻
export const UserEnter = (p) => commonPostQuery('/api/UserLicense/UserEnter', p)

// ---------------- Values ----------------
// 生成随机码(测试commonPostQuery方法用的)
export const GenKeyFromTime = (p) => commonPostQuery('/api/Values/GenKeyFromTime', p)

// 角色接口 Role
// 获取当前用户下的所有医联体
export const GetUnionListForRole = (p) => commonGet('/api/DjCommon/GetUnionList', p)

// 根据医联体id  获取模块信息
export const GetModuleRoleByunionid = (p) => commonGet('/api/Role/GetModuleRoleByunionid', p)

// 获取角色的功能权限
export const GetPlatFeatures = (p) => commonGet('/api/Role/GetPlatFeatures', p)

// 获取角色的数据权限
export const GetCustomDataRange = (p) => commonGet('/api/Role/GetCustomDataRange', p)

// 根据角色获取人员列表
export const GetPersonlistByRoleid = (p) => commonGet('/api/Role/GetPersonlistByRoleid', p)

// 保存角色
export const SaveForRole = (p) => commonPostBody('/api/Role/Save', p)

// 删除角色
export const DeleteForRole = (p) => commonPostQuery('/api/Role/Delete', p)

// 获取某模块下的医院列表
export const GetHosListForRole = (p) => commonGet('/api/DjCommon/GetHosList', p)

// 删除角色的人员
export const DelUserRole = (p) => commonPostQuery('/api/Role/DelUserRole', p)

// 管理后天目录相关接口
// 获取参数目录列表
export const GetCatalogList = (p) => commonPostBody('/api/VCatalog/GetCatalogList', p)

// 修改或保存参数目录
export const EditCatalogDetail = (p) => commonPostBody('/api/VCatalog/EditCatalogDetail', p, 1)

// 删除参数目录
export const DeleteCatalogDetail = (p) => commonGet('/api/VCatalog/DeleteCatalogDetail', p)

// 获取参数项目列表
export const GetValuesList = (p) => commonPostBody('/api/VCatalog/GetValuesList', p)

// 修改或保存参数信息
export const EditValuesDetail = (p) => commonPostBody('/api/VCatalog/EditValuesDetail', p, 1)

// 删除参数
export const DeleteValuesDetail = (p) => commonGet('/api/VCatalog/DeleteValuesDetail', p)

// 获取参数项目详情
export const GetValuesDetail = (p) => commonPostBody('/api/VCatalog/GetValuesDetail', p)

// 业务模块相关接口
// 获取分组名称
export const GetGroupTypes = (p) => commonGet('/api/PlatForm/GetGroupTypes', p)

// 获取APP分组名称
export const GetAppTypes = (p) => commonGet('/api/PlatForm/GetAppTypes', p)

// 获取业务模块管理列表
export const GetPUList = (p) => commonPostBody('/api/PlatForm/GetPUList', p)

// 新建或修改业务模块
export const EditPUDetail = (p) => commonPostBody('/api/PlatForm/EditPUDetail', p, 1)

// 删除模块
export const DeletePUDeail = (p) => commonGet('/api/PlatForm/DeletePUDeail', p)

// 模块功能相关接口
// 获取模块列表
export const GetPUListForFeature = (p) => commonGet('/api/Feature/GetPUListForFeature', p)

// 过去模块下一级功能
export const GetFeatureList = (p) => commonPostBody('/api/Feature/GetFeatureList', p)

// 新增、修改功能
export const EditFeatureDetail = (p) => commonPostBody('/api/Feature/EditFeatureDetail', p, 1)

// 功能属性分类列表
export const GetPropList = (p) => commonGet('/api/Feature/GetPropList', p)

// 禁用功能
export const OperateFeature = (p) => commonGet('/api/Feature/OperateFeature', p)

// 删除功能模块
export const DeleteFeature = (p) => commonGet('/api/Feature/DeleteFeature', p)

// 批量导入医生
export const ImportDoctor = (p) => commonPostBodyWithError('/api/Doctor/ImportDoctor', p, 1)

export {
  post,
  appid,
  domainurl
}
