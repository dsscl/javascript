import { lazyload } from '@/util'

// 门诊工作间路由
const mzwsRoutes = [
    // 上级医生
    {
        path: '/mzApplyList',
        name: 'mzApplyList',
        component: lazyload('mz/workspace/applyList')
    },
    {
        path: '/mzDetailEdit',
        name: 'mzDetailEdit',
        component: lazyload('mz/workspace/detailEdit')
    },
    {
        path: '/mzTemplateManage',
        name: 'mzTemplateManage',
        component: lazyload('mz/workspace/templateManage')
    },
    // 下级医生
    {
        path: '/mzApplySchedule',
        name: 'mzApplySchedule',
        component: lazyload('mz/workspace/juniorDoctor/applySchedule')
    },
    {
        path: '/mzApplyConsult',
        name: 'mzApplyConsult',
        component: lazyload('mz/workspace/juniorDoctor/applyConsult')
    },
    {
        path: '/mzPay',
        name: 'mzPay',
        component: lazyload('mz/workspace/juniorDoctor/pay')
    },
    {
        path: '/mzPaySuccess',
        name: 'mzPaySuccess',
        component: lazyload('mz/workspace/juniorDoctor/paySuccess')
    },
    {
        path: '/mzApplyForList',
        name: 'mzApplyForList',
        component: lazyload('mz/workspace/juniorDoctor/applyForList')
    },
    {
        path: '/mzApplyDetail',
        name: 'mzApplyDetail',
        component: lazyload('mz/workspace/juniorDoctor/applyDetail')
    },
    {
        path: '/mzPrescription',
        name: 'mzPrescription',
        component: lazyload('mz/workspace/juniorDoctor/prescription')
    },
]

// 门诊运营中心路由
const mzocRoutes = [{
        path: '/mzScheduleQuery',
        name: 'mzScheduleQuery',
        component: lazyload('mz/operationCenter/scheduleQuery')
    },
    {
        path: '/mzSchedule',
        name: 'mzSchedule',
        component: lazyload('mz/operationCenter/schedule')
    },
    {
        path: '/mzScheduleManage',
        name: 'mzScheduleManage',
        component: lazyload('mz/operationCenter/scheduleManage')
    },
    {
        path: '/mzPriceManage',
        name: 'mzPriceManage',
        component: lazyload('mz/operationCenter/priceManage')
    },
    {
        path: '/mzEvaluateManage',
        name: 'mzEvaluateManage',
        component: lazyload('mz/operationCenter/evaluateManage')
    },
    {
        path: '/mzRegisteredManage',
        name: 'mzRegisteredManage',
        component: lazyload('mz/operationCenter/registeredManage')
    },
    {
        path: '/mzDepartmentManage',
        name: 'mzDepartmentManage',
        component: lazyload('mz/operationCenter/departmentManage')
    },
    {
        path: '/mzCloseManage',
        name: 'mzCloseManage',
        component: lazyload('mz/operationCenter/closeManage')
    },
]

const mzRoutes = [...mzwsRoutes, ...mzocRoutes]

export {
    mzRoutes
}