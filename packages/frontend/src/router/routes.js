import merge from 'deepmerge'
import baseRoutes from '../modules/base/routes'
import mediaRoutes from '../modules/media/routes'

import {routes as userRoutes} from '@ci-user-module/frontend'
import {routes as customRoutes} from '@ci-custom-module/frontend'

const routes = merge.all([baseRoutes, mediaRoutes, userRoutes, customRoutes])


export default routes;