import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import "../../../../../../style/Forum.css";
import Category from '../../../Category';
import Forum from './../Forum';
import PostForum from './../PostForum';


function ViewForumCourse() {
    const [forums, setForums] = useState(null);
    const [course, setCourse] = useState(null);
    const [courseMoodle, setCourseMoodle] = useState(null)
    const [loadingC, setLoadingC] = useState(1);
    const [loadingMoodleC, setLoadingMoodleC] = useState(1);
    const [popup, setPopup] = useState(false)
    const [popupinfo, setPopupInfo] = useState(null)

    const email = useSelector(state => state.authen.email)
    const [tag, setTag] = useState("0")
    const { id } = useParams();



    useEffect(() => {
        getForumCourse()
        getForumMoodle()
    }, [])


    const getForumMoodle = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDCourses", "1266");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/forummoodle", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result[0])
                setCourseMoodle(result[0])
                setLoadingMoodleC(0)
            })
            .catch(error => console.log('error', error));
    }

    const getForumCourse = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDCourses", id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/forum/courses/viewone", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCourse(result)
                setLoadingC(0)
            })
            .catch(error => console.log('error', error));
    }

    const openPopup = ({...value}) =>{
        setPopupInfo({...value})
        setPopup(true)
    }

    const convertTimeAgo = (UNIX_timestamp) => {
        // var a = new Date(UNIX_timestamp);
        // var time = a.getHours() + ":" + a.getMinutes();
        // return time;
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = Date.now() - UNIX_timestamp;

        if (elapsed < msPerMinute) {
            return '1 phút trước';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' phút trước';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' giờ trước';
        }

        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' ngày trước';
        }

        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' tháng trước';
        }

        else {
            return Math.round(elapsed / msPerYear) + ' năm trước';
        }
    }

    const renderPopup = () => {
        if (popupinfo === null)
            return null;
        return <div className=" view row justify-content-center" >
            <div id="scrollbar1" className="col-8 col-md-4 popup" >
                <div type="button" onClick={()=>setPopup(false)} style={{ position: "absolute", right: "5px", top: "0" }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
                </div>
                <div>
                    <div style={{ fontWeight: "600" }}>{popupinfo.name}</div>
                    <div style={{ fontSize: "15px", paddingBottom: "10px" }}>Người đăng : {popupinfo.fullname}</div>
                    <div className="content" dangerouslySetInnerHTML={{ __html: popupinfo.mess }}></div>
                </div>
            </div >

        </div >
    }

    const renderTag = () => {

        if (tag === "0" && loadingC === 0) {
            if (course === null || course.length < 1)
                return <div class="row justify-content-center" >
                    <div className="col-md-6 list-forums" style={{ textAlign: "center", marginTop: "50px", fontSize: "20px" }}>Không tìm thấy diễn đàn nào</div>
                </div>

            return <div>
                {course.map((forum) => {

                    return <div class="row justify-content-center" >
                        <div className="col-md-6 list-forums">
                            <div className="card border-0">

                                <div >
                                    <div class="card-body" style={{ padding: "0.75rem" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <div className="card-text">
                                                <img width="40px" height="40px" src={forum.AvartaOwn} style={{ borderRadius: "40px", border: "1px solid #dfdfdf" }} />
                                            </div>
                                            <div style={{ paddingLeft: "10px" }}>

                                                <div className="own" style={{ display: "inline-block" }}>{forum.NameOwn}</div>

                                                <div className="card-text" style={{ display: "inline-block" }}>
                                                    <small className="text-muted">
                                                        {/* <span className="time" style={{marginRight:"10px"}}>|</span> */}
                                                        <span className="time">{convertTimeAgo(forum.time)}</span>
                                                    </small>
                                                </div>
                                            </div>

                                        </div>

                                        <Link to={tag === "0" ? "/forum/courses/post/" + forum.ID : "/forum/post/" + forum.ID}>
                                            <h4 type="button" class="card-title title" >{forum.title}</h4>
                                        </Link>
                                        <hr style={{ margin: "0", padding: "0" }} />
                                        <div className="card-text interactive" style={{ paddingTop: "0.5rem" }}>

                                            <span>{forum.LikeByOwn === 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="red" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                            </svg>} {forum.like} lượt thích </span>
                                            <span style={{ paddingLeft: "10px" }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 18">
                                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                            </svg> {forum.comment} bình luận</span>
                                        </div>
                                    </div>
                                </div>
                                {forum.image === "" ? null : <div className="card-header embed-responsive embed-responsive-4by3" style={{ borderBottom: "none" }}>
                                    <img class="card-img-top embed-responsive-item" style={{ objectFit: "cover", borderBottomLeftRadius: "7px", borderBottomRightRadius: "7px" }} src={forum.image}></img>
                                </div>}
                            </div>
                        </div>

                    </div>

                })}
            </div>
        }
        else if (loadingMoodleC === 0 && tag === "1") {
            if (courseMoodle === null || courseMoodle.length < 1)
                return <div class="row justify-content-center" >
                    <div className="col-md-6 list-forums" style={{ textAlign: "center", marginTop: "50px", fontSize: "20px" }}>Không tìm thấy diễn đàn nào</div>
                </div>
            return <div>
                {courseMoodle.Forum.map((forum) => {
                    return <div class="row justify-content-center">
                        <div type="button" className="col-md-6 list-forums" style={{ background: "white", padding: "15px", borderRadius: "7px", boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }} onClick={() => openPopup({ fullname: forum.fullname, name: forum.name, mess: forum.message })}>
                            {console.log(forum.name)}
                            <div style={{ fontWeight: "600" }}>{forum.name}</div>
                            <div style={{ fontSize: "15px" }}>Người đăng : {forum.fullname}</div>
                        </div>
                    </div>
                })}
            </div>
        }
    }


    if (loadingMoodleC === 1 && loadingC === 1)
        return null;
    else {
        var assign = tag === "0" ? "assign" : "";
        var moodle = tag === "1" ? "assign" : "";

        return <div className="col col-12">
            <div className="forum">
                <Category current="Môn học" currentlink="/forum/courses" sub1="Diễn đàn" sub1link={"/forum"} />
                <div className="deadline-tag">
                    <div className="row tag">
                        <div type="button" className={"col-6 btn-deadline " + assign} onClick={() => setTag("0")} style={{ fontSize: "14px" }}> Tất cả khóa học
                        </div>
                        <div type="button" className={"col-6 btn-deadline " + moodle} onClick={() => setTag("1")}> Môn học
                        </div>
                    </div>
                </div>
                {/* <PostForum /> */}
                {renderTag()}
                {popup && renderPopup()}
            </div>
        </div>
    }


    return null;
}

export default ViewForumCourse;