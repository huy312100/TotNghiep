import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Home() {
    const [uni, setUni] = useState(null);
    const [loading, setLoading] = useState(1)
    const role = useSelector(state => state.authen.role)

    useEffect(() => {
        getNewsUniversity();
    }, [])

    const getNewsUniversity = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var url
        if (role === "3")
            url = "https://hcmusemu.herokuapp.com/info/newsuniversity/parent"
        else url = "https://hcmusemu.herokuapp.com/info/newsuniversity"

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setUni(result);
                setLoading(0);
            })
            .catch(error => console.log('error', error));
    }

    if (loading === 0)
        return <div>
            {/* <div className="col-12"> */}
            <div className="news-page-uni">

                <div className="header">Thông báo nhà trường</div>
                {/* <hr/> */}

                {
                    uni.slice(0, 5).map((news,index) => {
                        return (
                            <div key={index} className="news">
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
                <Link to="./deadline?tag=1">Xem thêm</Link>


            </div>
        </div>
    return null;
}

export default Home;