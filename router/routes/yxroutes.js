import { lazyload } from '@/util'
// 医生端
const yxDoctorsRoutes = [{
            path: '/yxApplication',
            name: 'yxApplication',
            component: lazyload('yx/operationCenter/application')
        },
        {
            path: '/yxAlpplyDoctorlist',
            name: 'yxAlpplyDoctorlist',
            component: lazyload('yx/website/applyList')
        }

    ]
    //专家端
const yxExpertRoutes = [{
    path: '/yxExpertlist',
    name: 'yxExpertlist',
    component: lazyload('yx/website/applyList')
}]

const yxOcRoutes = [{
        path: '/yxOcFinshlist',
        name: 'yxOcFinshlist',
        component: lazyload('yx/website/lists')
    },
    {
        path: '/yxOcUnFinshlist',
        name: 'yxOcUnFinshlist',
        component: lazyload('yx/website/lists')
    },
    {
        path: '/yxCanclelist',
        name: 'yxCanclelist',
        component: lazyload('yx/website/cancleList')
    },
    {
        path: '/yxalpplyDoctorList',
        name: 'alpplyDoctorList',
        component: lazyload('yx/website/applyList')
    },
    {
        path: '/yxApplyConsult',
        name: 'yxApplyConsult',
        component: lazyload('yx/website/applyConsult/applyConsult')
    },
    {
        path: '/yxevaluationManagement',
        name: 'yxevaluationManagement',
        component: lazyload('yx/operationCenter/evaluationManagement')
    },
    {
        path: '/yxtimeoutWarn',
        name: 'yxtimeoutWarn',
        component: lazyload('yx/operationCenter/timeoutWarn')
    }


]
const yxRoutes = [...yxDoctorsRoutes, ...yxExpertRoutes, ...yxOcRoutes]
export {
    yxRoutes
}