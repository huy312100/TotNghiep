import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'


function CldAndDl() {

    const [cad, setCAD] = useState(null);
    const [loading, setLoading] = useState(1)

    useEffect(() => {
        getCldAndDl();
    }, [])

    const getCldAndDl = () => {
        var today = new Date();
        // today.getFullYear()
        // today.getMonth() + 1;      
        getCalendar(today.getFullYear(), today.getMonth() + 1);
    }

    const getCalendar = (year, month) => {
        var myHeaders = new Headers();
        // console.log(this.state.month)
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


        var urlencoded = new URLSearchParams();
        urlencoded.append("year", year);
        urlencoded.append("month", month);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/calendar/getthismonth", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setCAD(result)
                setLoading(0)
            })
            .then(success => {
                // console.log("success")
            })
            .catch(error => console.log('error', error));
    }

    if (loading === 0)
        return <div>
            <div className="news-page-uni">

                <div className="header">Lịch cá nhân và bài tập</div>
                {/* <hr/> */}
                {cad.map((deadline) => {
                    return <div className="news">
                        <div title={deadline.Decription.text} className="title">
                            {deadline.Title}
                        </div>
                        <div className="time">{deadline.Date.day}/{deadline.Date.month}/{deadline.Date.year}</div>
                    </div>
                })}
                <Link to="./calendar">Xem thêm</Link>
            </div>
        </div>
    return null;
}

export default CldAndDl;