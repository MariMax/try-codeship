import CoreLayout from 'layouts/CoreLayout'

import HomeRoute from './Home'
import TaskRoute from './Task'

export const createRoutes = () => ({
    path        : '/',
    component   : CoreLayout,
    indexRoute  : HomeRoute,
    childRoutes : [
         TaskRoute()
    ]
});

export default createRoutes