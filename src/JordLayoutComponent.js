import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { BreadCrumb } from 'primereact/breadcrumb';
import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppMenu from './AppMenu';
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import ProtectedRoute from './config/ProtectedRoute';
import useAuth from "./config/useAuth";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';


const JordLayoutControl = (props) => {

    const [layoutMode, setLayoutMode] = useState('static');
    const [pageTitle, setPageTitle] = useState('');
    const [pagePath, setPagePath] = useState('');
    const [tabTitle, setTabTitle] = useState('');
    const [lightMenu] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [isRTL] = useState(false);
    const [inlineUser, setInlineUser] = useState(false);
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [inlineUserMenuActive, setInlineUserMenuActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [topbarColor] = useState('layout-topbar-light');
    /*const [theme, setTheme] = useState('jord');*/
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle] = useState('outlined');
    const [ripple] = useState(false);
    const breadcrumbHome = { icon: 'pi pi-home', to: '/items/dashboard', url: '#/' };
    /* Authorisation related */
    const [isAuth, login, logout] = useAuth(true);
    const breadcrumbItems = [
        { label: 'Computer' },
        { label: 'Notebook' },
        { label: 'Accessories' },
        { label: 'Backpacks' },
        { label: 'Item' }
    ];
    const pagePathArr = pagePath.split('/').slice(1);

    const breadcrumbItems2 = pagePathArr.map((ppath, index) => {
        // console.log(index);
        if (pagePathArr.length > 1) {
            const notLast = index < pagePathArr.length - 1;
            const last = index = pagePathArr.length - 1;
            if (notLast) {
                console.log(index);
                return {
                    label: ppath
                }
            }
            if (last) {
                console.log(pageTitle);
                return {
                    label: pageTitle
                }
            }
        }
        return {}
    });

    const menu = isAuth ? props.menu : '';

    const routers = props.routers

    let topbarItemClick;
    let menuClick;
    let rightMenuClick;
    let userMenuClick;
    let configClick = false;

    const updatePageHeaders = (loc) => {
        /*set pageTitle & meta data */
        routers.map((router, index) => {
            if (loc) {
                if (router.path == loc) {
                    setPageTitle(router.pageTitle);
                    setTabTitle(router.tabTitle);
                    setPagePath(router.path);
                }
            } else {
                if (router.path == location.pathname) {
                    setPageTitle(router.pageTitle);
                    setTabTitle(router.tabTitle);
                    setPagePath(router.path);
                }
            }
        });
    }

    useEffect(() => {
        updatePageHeaders();

        if (staticMenuMobileActive) {
            blockBodyScroll();
        }
        else {
            unblockBodyScroll();
        }
    }, [staticMenuMobileActive]);

    const onDocumentClick = () => {
        if (!topbarItemClick) {
            setActiveTopbarItem(null);
            setTopbarMenuActive(false);
        }

        if (!rightMenuClick) {
            /* setRightPanelMenuActive(false); */
        }

        if (!userMenuClick && isSlim() && !isMobile()) {
            setInlineUserMenuActive(false);
        }

        if (!menuClick) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
            }

            if (overlayMenuActive || staticMenuMobileActive) {
                hideOverlayMenu();
            }

            unblockBodyScroll();
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        topbarItemClick = false;
        menuClick = false;
        rightMenuClick = false;
        userMenuClick = false;
        configClick = false;
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarMenuActive(false);
        /*setRightPanelMenuActive(false); */

        if (layoutMode === 'overlay') {
            setOverlayMenuActive(prevOverlayMenuActive => !prevOverlayMenuActive);
        }

        if (isDesktop())
            setStaticMenuDesktopInactive(prevStaticMenuDesktopInactive => !prevStaticMenuDesktopInactive);
        else {
            setStaticMenuMobileActive(prevStaticMenuMobileActive => !prevStaticMenuMobileActive);
            if (staticMenuMobileActive) {
                blockBodyScroll();
            } else {
                unblockBodyScroll();
            }
        }

        event.preventDefault();
    };

    const onTopbarMenuButtonClick = (event) => {
        topbarItemClick = true;
        setTopbarMenuActive(prevTopbarMenuActive => !prevTopbarMenuActive);
        hideOverlayMenu();
        event.preventDefault();
    };

    const onTopbarItemClick = (event) => {
        topbarItemClick = true;

        if (activeTopbarItem === event.item)
            setActiveTopbarItem(null);
        else
            setActiveTopbarItem(event.item);

        event.originalEvent.preventDefault();
    };

    const onMenuClick = () => {
        menuClick = true;
    };

    const onInlineUserClick = () => {
        userMenuClick = true;
        setInlineUserMenuActive(prevInlineUserMenuActive => !prevInlineUserMenuActive);
        setMenuActive(false);
    };

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const onRightMenuButtonClick = (event) => {
        rightMenuClick = true;
        /*setRightPanelMenuActive(prevRightPanelMenuActive => !prevRightPanelMenuActive);*/

        hideOverlayMenu();

        event.preventDefault();
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
    };

    const onMenuItemClick = (event) => {

        if (!event.item.items) {
            hideOverlayMenu();
        }
        if (!event.item.items && (isHorizontal() || isSlim())) {
            setMenuActive(false);
        }
        updatePageHeaders(event.item.to);
    };

    const onRootMenuItemClick = () => {
        setMenuActive(prevMenuActive => !prevMenuActive);
        setInlineUserMenuActive(false);
    };

    const isDesktop = () => {
        return window.innerWidth > 896;
    };

    const isMobile = () => {
        return window.innerWidth <= 1025;
    };

    const isHorizontal = () => {
        return layoutMode === 'horizontal';
    };

    const isSlim = () => {
        return layoutMode === 'slim';
    };

    const onLayoutModeChange = (layoutMode) => {
        setLayoutMode(layoutMode);
        setStaticMenuDesktopInactive(false);
        setOverlayMenuActive(false);

        if (layoutMode === 'horizontal' && inlineUser) {
            setInlineUser(false)
        }

    };

    const layoutClassName = classNames('layout-wrapper', {
        'layout-horizontal': layoutMode === 'horizontal',
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-slim': layoutMode === 'slim',
        'layout-menu-light': lightMenu,
        'layout-menu-dark': !lightMenu,
        'layout-overlay-active': overlayMenuActive,
        'layout-mobile-active': staticMenuMobileActive,
        'layout-static-inactive': staticMenuDesktopInactive,
        'layout-rtl': isRTL,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': !ripple
    }, topbarColor);

    const inlineUserTimeout = layoutMode === 'slim' ? 0 : { enter: 1000, exit: 450 };

    const location = useLocation();


    return (


        <div className={layoutClassName} onClick={onDocumentClick}>
            <AppTopbar topbarMenuActive={topbarMenuActive} activeTopbarItem={activeTopbarItem} inlineUser={inlineUser}
                onRightMenuButtonClick={onRightMenuButtonClick} onMenuButtonClick={onMenuButtonClick}
                onTopbarMenuButtonClick={onTopbarMenuButtonClick} onTopbarItemClick={onTopbarItemClick} pageTitle={pageTitle} />

            <div className="layout-menu-container" onClick={onMenuClick}>
                {
                    inlineUser && (
                        <div className="layout-profile">
                            <button type="button" className="p-link layout-profile-button" onClick={onInlineUserClick}>
                                <img src="assets/layout/images/avatar.png" alt="roma-layout" />
                                <div className="layout-profile-userinfo">
                                    <span className="layout-profile-name">Pradeep Lomte</span>
                                    <span className="layout-profile-role">System Developer</span>
                                </div>
                            </button>
                            <CSSTransition classNames="p-toggleable-content" timeout={inlineUserTimeout} in={inlineUserMenuActive} unmountOnExit>
                                <ul className={classNames('layout-profile-menu', { 'profile-menu-active': inlineUserMenuActive })}>
                                    <li>
                                        <button type="button" className="p-link">
                                            <i className="pi pi-fw pi-user"></i><span>Profile</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="p-link">
                                            <i className="pi pi-fw pi-cog"></i><span>Settings</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="p-link">
                                            <i className="pi pi-fw pi-envelope"></i><span>Messages</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="p-link">
                                            <i className="pi pi-fw pi-bell"></i><span>Notifications</span>
                                        </button>
                                    </li>
                                </ul>
                            </CSSTransition>
                        </div>
                    )
                }
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} onRootMenuItemClick={onRootMenuItemClick} layoutMode={layoutMode} active={menuActive} mobileMenuActive={staticMenuMobileActive} />
            </div>

            <div className="layout-main">
                <BreadCrumb home={breadcrumbHome} model={breadcrumbItems2} />
                <div className="layout-content">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>{tabTitle}</title>
                    </Helmet>
                    {
                        routers.map((router, index) => {
                            if (router.exact) {
                                <Route key={`router${index}`} path={router.path} exact component={router.component} />
                            }
                            // return <ProtectedRoute path={router.path} component={router.component} auth={isAuth}>
                            //     <Route key={`router${index}`} path={router.path} component={router.component} />
                            // </ProtectedRoute>
                            return <Route key={`router${index}`} path={router.path} component={router.component} />
                        })
                    }

                </div>

                <AppFooter />
            </div>

            <div className="layout-content-mask"></div>
        </div>
    );

}

export default JordLayoutControl;
