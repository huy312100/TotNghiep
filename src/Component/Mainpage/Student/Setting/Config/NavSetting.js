import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import "../../../../../style/NavSetting.css"

class NavSetting extends Component {
    render() {
        return (
            <div className="col">
                <div className="row boxshadow" style={{ background: "white", padding: "10px", marginLeft: "0", marginRight: "0", borderRadius: "5px" }}>
                    {localStorage.getItem("role") !== "3" && <NavLink style={{ margin: "0", borderRadius: "0" }} className="col col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 content-sidenav" to="setting" activeClassName="seturl-active">
                        <span className="side-img">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
                                <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                                <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                            </svg>
                        </span>
                        <span className="side-text">Kết nối</span>
                    </NavLink>}
                    <NavLink style={{ margin: "0", borderRadius: "0" }} className="col col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 content-sidenav" to="changepw" activeClassName="seturl-active">
                        <span className="side-img">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                                <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                            </svg>
                        </span>

                        <span className="side-text">Đổi mật khẩu</span>
                    </NavLink>
                    {localStorage.getItem("role") !== "3" && <NavLink style={{ margin: "0", borderRadius: "0" }} className="col col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 content-sidenav" to="parent" activeClassName="seturl-active">
                        <span className="side-img">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                            </svg>
                        </span>

                        <span className="side-text">Phụ huynh</span>
                    </NavLink>}
                </div>
            </div>
        );
    }
}

export default NavSetting;