import React from 'react';
import { Link } from 'react-router-dom';

const link = {
    fontSize: "calc(6px + 0.5vw)",
    margin: "0 1vw"
}

const Category = (props) => {

    return <div style={{ padding: "10px 0", display: "flex", alignItems: "center" }}>
        <div style={{
            fontWeight: "500",
            color: "#636363",
            fontSize: "calc(12px + 1vw)",
            borderRight: "1px solid #d6dce1",
            paddingRight: "1vw"
        }}>{props.current}</div>
        <Link style={link} to="/home">Trang chủ</Link>
        {props.sub1 ? <div><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
            <Link style={link} to={props.sub1link}>{props.sub1}</Link></div> : null}
        {props.current ? <div><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
            <Link style={link} to={props.currentlink}>{props.current}</Link></div> : null}

    </div >
}

export default Category;