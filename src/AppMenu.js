import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Ripple } from 'primereact/ripple';

const AppSubmenu = (props) => {

    const [activeIndex, setActiveIndex] = useState(null)

    const onMenuItemClick = (event, item, index) => {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
            event.preventDefault();
        }
        if (item.items) {
            event.preventDefault();
        }
        if (props.root) {
            props.onRootMenuItemClick({
                originalEvent: event,
            });
        }
        if (item.items) {
            setActiveIndex(index === activeIndex ? null : index);
        }

        props.onMenuItemClick({
            originalEvent: event,
            item: item
        });
    };

    const onMenuItemMouseEnter = (index) => {
        if (props.root && props.menuActive && isHorizontalOrSlim() && !isMobile()) {
            setActiveIndex(index)
        }
    };

    const isMobile = () => {
        return window.innerWidth <= 1025;
    };

    const isHorizontalOrSlim = useCallback(() => {
        return (props.layoutMode === 'horizontal' || props.layoutMode === 'slim');
    }, [props.layoutMode]);

    const isSlim = useCallback(() => {
        return props.layoutMode === 'slim';
    }, [props.layoutMode]);

    const visible = (item) => {
        return typeof item.visible === "function" ? item.visible() : item.visible !== false;
    };

    const getLink = (item, index) => {
        const menuitemIconClassName = classNames('layout-menuitem-icon', item.icon);
        const content = (
            <>
                <i className={menuitemIconClassName}></i>
                <span className="layout-menuitem-text">{item.label}</span>
                { item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                <Ripple />
            </>
        );
        const commonLinkProps = {
            'style': item.style,
            'className': classNames(item.class, 'p-ripple', { 'p-disabled': item.disabled, 'p-link': !item.to }),
            'target': item.target,
            'onClick': (e) => onMenuItemClick(e, item, index),
            'onMouseEnter': () => onMenuItemMouseEnter(index)
        }

        if (item.url) {
            return <a href={item.url} rel="noopener noreferrer" {...commonLinkProps}>{content}</a>
        }
        else if (!item.to) {
            return <button type="button" {...commonLinkProps}>{content}</button>
        }

        return <NavLink to={item.to} exact activeClassName="active-menuitem-routerlink" {...commonLinkProps}>{content}</NavLink>;
    };

    const isMenuActive = (item, index) => {
        return item.items && (props.root && (!isSlim() || (isSlim() && (props.mobileMenuActive || activeIndex !== null))) ? true : activeIndex === index);
    }

    const getItems = () => {
        const transitionTimeout = props.mobileMenuActive ? 0 : (isSlim() && props.root ? { enter: 0, exit: 0 } : (props.root ? 0 : { enter: 1000, exit: 450 }));
        return props.items.map((item, i) => {
            if (visible(item)) {
                const menuitemClassName = classNames({ 'layout-root-menuitem': props.root, 'active-menuitem': activeIndex === i && !item.disabled });
                const rootMenuItem = props.root && <div className="layout-menuitem-root-text">{item.label}</div>;
                const link = getLink(item, i);
                const tooltip = (
                    <div className="layout-menu-tooltip">
                        <div className="layout-menu-tooltip-arrow"></div>
                        <div className="layout-menu-tooltip-text">{item.label}</div>
                    </div>
                );

                return (
                    <li key={item.label || i} className={menuitemClassName} role="menuitem">
                        {rootMenuItem}
                        {link}
                        {tooltip}
                        <CSSTransition classNames="p-toggleable-content" timeout={transitionTimeout} in={isMenuActive(item, i)} unmountOnExit>
                            <AppSubmenu items={visible(item) && item.items} menuActive={props.menuActive} layoutMode={props.layoutMode} parentMenuItemActive={activeIndex === i} onMenuItemClick={props.onMenuItemClick}></AppSubmenu>
                        </CSSTransition>
                    </li>
                );
            }

            return null;
        })
    };

    useEffect(() => {
        if (!props.menuActive && isHorizontalOrSlim()) {
            setActiveIndex(null);
        }
    }, [props.menuActive, isHorizontalOrSlim]);

    if (!props.items) {
        return null;
    }

    const items = getItems();
    return (
        <ul className={props.className} role="menu">
            {items}
        </ul>
    );
}

const AppMenu = (props) => {

    return <AppSubmenu items={props.model} className="layout-menu"
        menuActive={props.active} onRootMenuItemClick={props.onRootMenuItemClick} mobileMenuActive={props.mobileMenuActive}
        onMenuItemClick={props.onMenuItemClick} root layoutMode={props.layoutMode} parentMenuItemActive />

}

export default AppMenu;
