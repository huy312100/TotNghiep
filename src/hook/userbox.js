import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function UserBox() {

    return (
        <Link to="/logout" type="button" className="user-link" style={{ textDecoration: 'none', fontWeight: 'bold',fontSize:"14px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50 feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span style={{marginLeft:"5px"}}>Đăng xuất</span>
        </Link>
    )
}