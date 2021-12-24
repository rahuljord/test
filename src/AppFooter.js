import React from 'react';
import { NavLink } from "react-router-dom";
const AppFooter = () => {

    return (
        <div className="layout-footer">
            <div style={{ color: "#666" }}>

                <p>© Copyright Jord International. All rights reserved   
              
            <a href="https://www.jord.com.au/" rel="noreferrer" target="_blank" style={{marginLeft:'.5rem'}} >www.jord.com.au</a></p>
            </div>

            <div className="footer-icons">
                <button type="button" className="p-link">
                    <i className="pi pi-home"></i>
                </button>
                <button type="button" className="p-link">
                    <i className="pi pi-globe"></i>
                </button>
                <button type="button" className="p-link">
                    <i className="pi pi-envelope"></i>
                </button>
            </div>
        </div>
    )
}

export default AppFooter;