import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function Home() {
    const [uni, setUni] = useState(null);
    const [loading, setLoading] = useState(1)

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

        fetch("https://hcmusemu.herokuapp.com/info/newsuniversity", requestOptions)
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
            <div className="news-page-uni">
                <div className="header">Thông báo nhà trường</div>
                {/* <hr/> */}

                {
                    uni.slice(0, 5).map((news) => {
                        return (<a href={news.Link} target="_blank" rel="noopener noreferrer"><div className="news">
                            <div className="title">
                                {news.Title}
                            </div>
                            <div className="time">
                                {news.Date}
                            </div>

                        </div>
                            {/* <hr/> */}
                        </a>
                        )
                    })
                }
                <Link to="./deadline?tag=1">Xem thêm</Link>


            </div>
        </div>
    return null;
}

export default Home;