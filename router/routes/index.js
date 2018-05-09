import { lazyload } from '@/util'
import { blRoutes } from './blRoutes'
import { mzRoutes } from './mzRoutes'
import { hzRoutes } from './hzRoutes'
import { yxRoutes } from './yxRoutes'

// 公共路由
const baseRoutes = [{
  path: '/',
  redirect: '/blSiteIndex',
}]

export const routes = [...baseRoutes, ...blRoutes, ...mzRoutes, ...hzRoutes, ...yxRoutes]