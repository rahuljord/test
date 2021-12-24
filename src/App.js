import JordLayoutControl from './JordLayoutComponent';
import Dashboard from './components/Dashboard';
import useAuth from "./config/useAuth";
import LeaveList from "./components/LeaveList";
import LeaveComponent from './components/LeaveComponent';
import Home from './components/Home';
const App = () => {
    const [isAuth, login, logout] = useAuth(false);
    const menu = [
        {
            label: 'Favorites', icon: 'pi pi-fw pi-home',
            items: [
                { label: 'Home', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Dashboard', icon: 'pi pi-fw pi-id-card', to: '/dashboard' },
                { label: 'Redux-Leave', icon: 'pi pi-fw pi-id-card', to: '/leavelist' },

            ],
        }
    ];

    const routers = [
       //   { path: '/', component: LeaveView, exact: true , pageTitle: 'Home', tabTitle: 'JH - Home' },
        { path: '/home', component: Home, pageTitle: 'Home', tabTitle: 'JH - Dashboard' },
        { path: '/dashboard', component: Dashboard, pageTitle: 'Dashboard', tabTitle: 'JH - Dashboard' },
        { path: '/leavelist', component: LeaveList, pageTitle: 'Redux-Leave', tabTitle: 'JH - Redux' },
        { path: '/leavedetail/:leaveId', component: LeaveComponent, pageTitle: 'Leave with redux', tabTitle: 'Leave with redux' }

    ];

    return (<JordLayoutControl menu={menu} routers={routers}></JordLayoutControl>);

}

export default App;
