import JordLayoutControl from './JordLayoutComponent';
import Dashboard from './components/Dashboard';
import useAuth from "./config/useAuth";

import DmsFormList from './components/DMS_APPLICATION/DmsFormList';
import DmsCreate from './components/DMS_APPLICATION/DmsCreate';
import DmsEdit from './components/DMS_APPLICATION/DmsEdit';
import DmsSettingsListById from './components/DMS_SETTINGS/DmsSettingsListByAppId';
import DmsSettingsForm from './components/DMS_SETTINGS/DmsSettingsForm';
import DmsSettingsEditForm from './components/DMS_SETTINGS/DmsSettingsEditForm';
import DmsSettingsListByAppId from './components/DMS_SETTINGS/DmsSettingsListByAppId';
import DmsSettingsCreate from './components/DMS_SETTINGS/DmsSettingsCreate';
const App = () => {
    const [isAuth, login, logout] = useAuth(false);
    const menu = [
        {
            label: 'Favorites', icon: 'pi pi-fw pi-home',
            items: [
                { label: 'Home', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'DMS Application', icon: 'pi pi-fw pi-file', to: '/dms_list' },
                { label: 'Dashboard', icon: 'pi pi-fw pi-id-card', to: '/dashboard' },
                { label: 'settings List Page', icon: 'pi pi-fw pi-id-card', to: '/DmsSettingsListByAppId' },
                { label: 'settings form page', icon: 'pi pi-fw pi-id-card', to: '/DmsSettingsForm' },
                { label: 'settings form new', icon: 'pi pi-fw pi-id-card', to: '/DmsSettingsNew' },

            ],
        }
    ];

    const routers = [
        { path: '/dms_new', component: DmsCreate, pageTitle: 'Dashboard', tabTitle: 'JH - Dashboard' },
        { path: '/dms_list', component: DmsFormList, pageTitle: 'DMS Application', tabTitle: 'JH - Dashboard' },
        { path: '/dms_edit/:dmsappid', component: DmsEdit, pageTitle: 'DMS edit', tabTitle: 'edit page' },
        { path: '/DmsSettingsListByAppId/:dmsappSettingAppId', component: DmsSettingsListByAppId, pageTitle: 'DMS edit', tabTitle: 'edit page' },
        { path: '/DmsSettingsForm', component: DmsSettingsForm, pageTitle: 'DMS edit', tabTitle: 'edit page' },
        { path: '/DmsSettingsEdit/:dmsappSettingId', component: DmsSettingsEditForm, pageTitle: 'DMS edit', tabTitle: 'edit page' },
        { path: '/DmsSettingsNew', component: DmsSettingsCreate, pageTitle: 'DMS edit', tabTitle: 'edit page' },

    ];

     return (<JordLayoutControl menu={menu} routers={routers}></JordLayoutControl>);

}

export default App;
