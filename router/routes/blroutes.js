import { lazyload } from '@/util'

// 病理大师网站路由
const bldsRoutes = [{
        path: '/blSiteIndex',
        name: 'blSiteIndex',
        component: lazyload('bl/website/user/index'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/blConsultList',
        name: 'blConsultList',
        component: lazyload('bl/website/consultation/lists')
    },
    {
        path: '/blApplyDigitalSlice',
        name: 'blApplyDigitalSlice',
        component: lazyload('bl/website/consultation/applyDigitalSlice')
    },
    {
        path: '/blApplySendSlice',
        name: 'blApplySendSlice',
        component: lazyload('bl/website/consultation/applySendSlice')
    },
    {
        path: '/blConsultDetail',
        name: 'blConsultDetail',
        component: lazyload('bl/website/consultation/consultDetail')
    },
    {
        path: '/blConsultType',
        name: 'blConsultType',
        component: lazyload('bl/website/consultation/consultType')
    },
    {
        path: '/blPathologyType',
        name: 'blPathologyType',
        component: lazyload('bl/website/consultation/pathologyType')
    },
    {
        path: '/blViewSlice',
        name: 'blViewSlice',
        component: lazyload('bl/website/consultation/viewSlice')
    },
    {
        path: '/blSlide',
        name: 'blSlide',
        component: lazyload('bl/website/consultation/slide')
    },
    {
        path: '/blDoctorLicense',
        name: 'blDoctorLicense',
        component: lazyload('bl/website/user/doctorLicense')
    },
    {
        path: '/blExpertHome',
        name: 'blExpertHome',
        component: lazyload('bl/website/user/expertHome')
    },
    {
        path: '/blExpertList',
        name: 'blExpertList',
        component: lazyload('bl/website/user/expertList')
    },

    {
        path: '/blExpertSettle',
        name: 'blExpertSettle',
        component: lazyload('bl/website/user/expertSettle')
    },
    {
        path: '/blPersonalCenter',
        name: 'blPersonalCenter',
        component: lazyload('bl/website/user/personalCenter')
    },
    {
        path: '/blMyConsult',
        name: 'blMyConsult',
        component: lazyload('bl/website/user/myConsult')
    },
    {
        //支付页面
        path: '/blPayOnline',
        name: 'blPayOnline',
        component: lazyload('bl/website/pay/payOnline')
    },
    {
        path: '/blPayError',
        name: 'blPayError',
        component: lazyload('bl/website/pay/payError')
    },
    {
        path: '/blPaySuccess',
        name: 'blPaySuccess',
        component: lazyload('bl/website/pay/paySuccess')
    },
    {
        path: '/blPayType',
        name: 'blPayType',
        component: lazyload('bl/website/pay/payType')
    },
    {
        path: '/wxRedirect',
        name: 'wxRedirect',
        component: lazyload('bl/website/user/wxRedirect')
    },
    {
        path: '/commonProblem',
        name: 'commonProblem',
        component: lazyload('bl/website/help/commonProblem')
    },
    {
        path: '/WXUploadProcess',
        name: 'WXUploadProcess',
        component: lazyload('bl/website/help/WXUploadProcess')
    },
    {
        path: '/blSlideList',
        name: 'blSlideList',
        component: lazyload('bl/website/consultation/slideList')
    }
]

// 病理运营中心路由
const blocRoutes = [{
        path: '/blHomepage',
        name: 'blHomepage',
        component: lazyload('bl/operationCenter/homePage')
    },
    {
        path: '/blUnfinished',
        name: 'blUnfinished',
        component: lazyload('bl/operationCenter/lists')
    },
    {
        path: '/blfinished',
        name: 'blfinished',
        component: lazyload('bl/operationCenter/lists')
    },
    {
        path: '/blDiagnosis',
        name: 'blDiagnosis',
        component: lazyload('bl/operationCenter/diagnosis')
    },
    {
        path: '/blTimeoutWarn',
        name: 'blTimeoutWarn',
        component: lazyload('bl/operationCenter/timeoutWarn')
    },
    {
        path: '/blEditConsultation',
        name: 'blEditConsultation',
        component: lazyload('bl/operationCenter/editConsultation')
    },
    {
        path: '/blApplyformDetail',
        name: 'blApplyformDetail',
        component: lazyload('bl/operationCenter/applyformDetail')
    },

    {
        path: '/blEvaluationManagement',
        name: 'blEvaluationManagement',
        component: lazyload('bl/operationCenter/evaluationManagement')
    },
    {
        path: '/blPriceManage',
        name: 'blPriceManage',
        component: lazyload('bl/operationCenter/priceManage')
    },
    {
        path: '/blCancelledList',
        name: 'blCancelledList',
        component: lazyload('bl/operationCenter/cancelledList')
    },
    {
        path: '/bldialogSetDivision',
        name: 'bldialogSetDivision',
        component: lazyload('bl/operationCenter/subComponents/dialogSetDivision')
    },
    {
        path: '/blViewSliceNoDiagnose',
        name: 'blViewSliceNoDiagnose',
        component: lazyload('bl/operationCenter/viewSliceNoDiagnose')
    }
]

const blRoutes = [...bldsRoutes, ...blocRoutes]

export {
    blRoutes
}