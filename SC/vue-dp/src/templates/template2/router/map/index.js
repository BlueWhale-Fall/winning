//不同功能模块的路由代码应该分离

import initRoutes from './init.js'
import listRoutes from './list.js'

export default [
  ...initRoutes,
  ...listRoutes
]
