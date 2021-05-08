import React from 'react';
import { Link, useHistory } from 'react-router-dom';


export default function SetURLSuccuss() {
    let history = useHistory();

    let continueSetURL = () => {
        // history.push("/setting");
        window.location.reload();
    }

    return (
        <div className="success-box">
                <div className="content">
                    <img width="100vw" src={process.env.PUBLIC_URL + 'Icon/success.png'}></img>
                    <span>Kết nối thành công</span>
                </div>
                <div className="back" type="button" onClick={continueSetURL}>Trở về</div>
        </div>
    )
}