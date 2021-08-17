import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function NewsFac() {
    const [fac, setFac] = useState(null);
    const [loading, setLoading] = useState(1)
    const role = useSelector(state => state.authen.role)


    useEffect(() => {
        getNewsFaculty();
    }, [])

    const getNewsFaculty = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var url
        if (role === "3")
            url = "https://hcmusemu.herokuapp.com/info/newsfaculty/parent"
        else url = "https://hcmusemu.herokuapp.com/info/newsfaculty"

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setFac(result)
                setLoading(0)
            })
            .catch(error => console.log('error', error));
    }

    if (loading === 0)
        return <div>
            <div className="news-page-uni">
                <div className="header">Thông báo khoa</div>
                {/* <hr/> */}
                {
                    fac.slice(0, 5).map((news) => {
                        return (
                            <div className="news">
                                <a href={news.Link} target="_blank" rel="noopener noreferrer">

                                    <div className="title">
                                        {news.Title}
                                    </div>
                                </a>
                                <div className="time">
                                    {news.Date}
                                </div>

                            </div>


                        )
                    })
                }
                <Link to="./deadline?tag=2">Xem thêm</Link>


            </div>
        </div>
    return null;
}

export default NewsFac;