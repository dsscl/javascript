import { lazyload } from '@/util'
//运营端
const hzOperactionRoutes = [
    {
        path: '/hzfinished',
        name: 'hzfinished',
        component: lazyload('hz/operationCenter/lists'),
        meta: {
            title: '已完成列表'
        }
    },
    {
        path: '/hzUnfinished',
        name: 'hzUnfinished',
        component: lazyload('hz/operationCenter/lists'),
        meta: {
            title: '未完成列表'
        }
    },
    {
        path: '/hzcancelList',
        name: 'hzcancelList',
        component: lazyload('hz/operationCenter/hzcancelList'),
        meta: {
            title: '取消列表'
        }
    },
]

// 医生端
const hzDoctorRoutes = [
    {
        path: '/hzConsultList',
        name: 'hzConsultList',
        component: lazyload('hz/website/lists'),
        meta: {
            title: '获取列表'
        }
    },
    {
        path: '/hzApplyType',
        name: 'hzApplyType',
        component: lazyload('hz/website/applyConsult/applyType'),
        meta: {
            title: '选择会诊种类'
        }
    },
    {
        path: '/hzChooseCaseType',
        name: 'hzChooseCaseType',
        component: lazyload('hz/website/applyConsult/chooseCaseType'),
        meta: {
            title: '选择会诊类型'
        }
    },
    {
        path: '/hzApplyConsult',
        name: 'hzApplyConsult',
        component: lazyload('hz/website/applyConsult/applyConsult'),
        meta: {
            title: '申请会诊'
        }
    },
    {
        path: '/hzPayType',
        name: 'hzPayType',
        component: lazyload('hz/website/applyConsult/payType'),
        meta: {
            title: '选择支付类型'
        }
    },
    {
        path: '/hzPay',
        name: 'hzPay',
        component: lazyload('hz/website/applyConsult/pay'),
        meta: {
            title: '支付'
        }
    },
    {
        path: '/hzPayResult',
        name: 'hzPayResult',
        component: lazyload('hz/website/applyConsult/payResult'),
        meta: {
            title: '支付结果'
        }
    },
    {
        path: '/hzConsultDetail',
        name: 'hzConsultDetail',
        component: lazyload('hz/website/operatorConsult/consultDetail'),
        meta: {
            title: '查看详情'
        }
    },
    {
        path: '/hzEvaluateManage',
        name: 'hzEvaluateManage',
        component: lazyload('bl/operationCenter/evaluationManagement'),
        meta: {
            title: '评价管理'
        }
    },
    {
        path: '/hzPriceManage',
        name: 'hzPriceManage',
        component: lazyload('bl/operationCenter/priceManage.vue'),
        meta: {
            title: '价格管理'
        }
    },
    {
        path: '/hzTimeoutReminding',
        name: 'hzTimeoutReminding',
        component: lazyload('hz/website/consultation/timeoutWarn.vue'),
        meta: {
            title: '超时提醒'
        }
    },
]

const hzRoutes = [...hzDoctorRoutes,...hzOperactionRoutes]

export {
    hzRoutes
}