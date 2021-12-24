import Roles from './Roles';
import { LeaveView, EditLeave } from '../components';


// TODO:
/*
* 1. Make title optional
* 2. Make title multi type support ie: (string, node, react element)
* */

export default [
    {
        component: LeaveView,
        path: '/',
        title: 'Home',
        exact: true,
    },
    {
        component: LeaveView,
        path: '/leaveview',
        title: 'Leave View',
    },
 
    {
        component: LeaveView,
        path: '/leaveview',
        title: 'go inside',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
            Roles.MANAGER
        ],
        children: [
            {
                component: EditLeave,
                path: '/child-1',
                title: 'Child - 1',
            },
            {
                component: ModuleNChild2,
                path: '/child-2',
                title: 'Child - 2',
            },
            {
                component: ModuleNChild3,
                path: '/child-3',
                title: 'Child - 3',
                permission: [
                    Roles.SUPER_ADMIN,
                    Roles.ADMIN
                ]
            }
        ]
    },
    {
        component: Dashboard,
        path: '/dashboard',
        title: 'Dashboard',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.ADMIN,
        ],
    },
  
]