import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

const AppTopbar = (props) => {

    const history = useHistory();

    const onTopbarItemClick = (event, item) => {
        if (props.onTopbarItemClick) {
            props.onTopbarItemClick({
                originalEvent: event,
                item: item
            });
        }
    }

    return (
        <div className="layout-topbar">
            <button type="button" className="p-link layout-menu-button layout-topbar-icon" onClick={props.onMenuButtonClick}>
                <i className="pi pi-bars"></i>
            </button>

            <button type="button" className="p-link layout-topbar-logo" onClick={() => history.push('/')}>
                <img id="topbar-logo" src="assets/layout/images/logo-jord.png" alt="Jord_International_Logo" />
            </button>
            <span className="layout-topbar-heading" >{props.pageTitle}</span>
            
            {/* <span className="layout-topbar-search">
                <i className="pi pi-search"></i>
                <input type="text" placeholder="Enter your search term" />
            </span>  */}
            <ul className="topbar-menu">            
                <li className={classNames('user-profile', { 'active-topmenuitem fadeInDown': props.activeTopbarItem === 'profile' })}>
                    {!props.inlineUser && <button type="button" className="p-link" onClick={(e) => onTopbarItemClick(e, 'profile')}>
                        <img src="assets/layout/images/pradeep.JPG" alt="roma-layout" />
                        <div className="layout-profile-userinfo">
                            <span className="layout-profile-name">Pradeep Lomte</span>
                            <span className="layout-profile-role">System Developer</span>
                        </div>
                    </button>}

                    <ul className="fadeInDown">
                        <li role="menuitem">
                            <button type="button" className="p-link">
                                <i className="pi pi-fw pi-user"></i>
                                <span>Profile</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button type="button" className="p-link">
                                <i className="pi pi-fw pi-cog"></i>
                                <span>Settings</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button type="button" className="p-link">
                                <i className="pi pi-fw pi-envelope"></i>
                                <span>Messages</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button type="button" className="p-link">
                                <i className="pi pi-fw pi-bell"></i>
                                <span>Notifications</span>
                            </button>
                        </li>
                    </ul>
                </li>
              </ul>
        </div>
    )
}

export default AppTopbar;