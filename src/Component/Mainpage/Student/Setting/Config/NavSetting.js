import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import "../../../../../style/NavSetting.css"

class NavSetting extends Component {
    render() {
        return (
            <div className="col">
                <div className="row boxshadow" style={{background:"white",padding:"10px",marginLeft:"0",marginRight:"0",borderRadius:"5px"}}>
                    <NavLink style={{margin:"0",borderRadius:"0"}} className="col col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 content-sidenav" to="setting" activeClassName="seturl-active">
                        <span className="side-img">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
                                <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                                <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                            </svg>
                        </span>
                        <span className="side-text">Kết nối</span>
                    </NavLink>
                    <NavLink style={{margin:"0",borderRadius:"0"}} className="col col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 content-sidenav" to="changepw" activeClassName="seturl-active">
                        <span className="side-img">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                                <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                            </svg>
                        </span>

                        <span className="side-text">Đổi mật khẩu</span>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default NavSetting;