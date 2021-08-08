import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import "../../../../../../style/Forum.css";
import Category from '../../../Category';
import ViewComment from '../ViewComment';
import Forum from './../Forum';
import PostForum from './../PostForum';

const backCover = {
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    position: 'fixed',
    // marginTop: 20,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3
    // opacity: 0.5,
}

function ViewForumCourse() {
    const [course, setCourse] = useState(null);
    const [courseMoodle, setCourseMoodle] = useState(null)
    const [loadingC, setLoadingC] = useState(1);
    const [loadingMoodleC, setLoadingMoodleC] = useState(1);
    const [popup, setPopup] = useState(null)

    const [loadding, setLoadding] = useState(true)

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
        urlencoded.append("IDCourses", id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/forummoodle", requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json()
                throw new Error("Không có môn học bài viết")
            })
            .then(result => {
                console.log(result[0])
                setCourseMoodle(result[0])
                setLoadingMoodleC(0)
            })
            .catch(error => {
                setLoadingMoodleC(0)
                console.log('error', error)
            });
    }

    const getForumCourse = () => {
        setLoadding(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") + "sT");

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
                setLoadding(false)
            })
            .catch(error => console.log('error', error));
    }

    const Delete_API = (forum) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", forum.ID);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        let items
        let temp
        let scopeFunction
        var url
        if (forum.IDCourses !== undefined) {
            items = [...course];
            temp = [...course];
            scopeFunction = setCourse
            url = 'https://hcmusemu.herokuapp.com/forum/courses/delete'
        }

        const index = items.findIndex(item => item.ID === forum.ID);

        items.splice([index], 1);

        // rm company node if it have no items

        scopeFunction(items)

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok)
                    return response.text()
                throw Error("Đã xảy ra lỗi khi xóa bài viết")
            })
            .catch(error => scopeFunction(temp));
    }

    const Unlike_API = (forum) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", forum.ID);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        let items
        let temp
        let scopeFunction
        if (forum.IDCourses !== undefined) {
            items = [...course];
            temp = [...course];
            scopeFunction = setCourse
        }

        const index = items.findIndex(item => item.ID === forum.ID);

        items[index].LikeByOwn = 0;
        items[index].like -= 1;
        scopeFunction(items)
        fetch("https://hcmusemu.herokuapp.com/forum/unlike", requestOptions)
            .then(response => {
                if (response.ok)
                    response.text()
                else throw Error("Bỏ thích không thành công")
            })
            .catch(error => {
                console.log('error', error)
                scopeFunction(temp)
            });
    }

    const Like_API = (forum) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", forum.ID);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        let items
        let temp
        let scopeFunction
        if (forum.IDCourses !== undefined) {
            items = [...course];
            temp = [...course];
            scopeFunction = setCourse
        }

        console.log(items)
        console.log(forum.ID)

        const index = items.findIndex(item => item.ID === forum.ID);

        console.log("index", index)

        items[index].LikeByOwn = 1;
        items[index].like += 1;

        scopeFunction(items)
        fetch("https://hcmusemu.herokuapp.com/forum/like", requestOptions)
            .then(response => {
                if (response.ok)
                    response.text()
                else throw Error("Không thể thích bài viết");
            })
            .catch(error => {
                scopeFunction(temp)

            });
    }

    const getComments = useCallback((forum) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", forum.ID);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch("https://hcmusemu.herokuapp.com/forum/viewcmt", requestOptions)
    }, [])



    const LikeAndUnlikeClick = (forum) => {
        if (forum.LikeByOwn === 0)
            Like_API(forum)
        else Unlike_API(forum)
    }

    const Btn_ClickShowComment = (forum) => {

        let items
        let temp
        let scopeFunction

        // console.log(forum)

        items = [...course];
        temp = [...course];
        scopeFunction = setCourse

        // console.log(items)

        const index = items.findIndex(item => item.ID === forum.ID);

        items[index].showcomment = true;
        scopeFunction(items)

        // console.log(items[index])

    }

    // const openPopup = ({ ...value }) => {
    //     setPopupMoodle({ ...value })
    // }

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

    // const renderPopupMoodle = () => {
    //     if (popupMoodle === null)
    //         return null;
    //     return <div className="forum row justify-content-center" >
    //         <div id="scrollbar1" className="col-8 col-md-4 dialog-popup" >
    //             <div type="button" onClick={() => setPopupMoodle(false)} style={{ position: "absolute", right: "5px", top: "0" }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
    //                 <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
    //                 <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    //             </svg>
    //             </div>
    //             <div>
    //                 <div style={{ fontWeight: "600" }}>{popupMoodle.name}</div>
    //                 <div style={{ fontSize: "15px", paddingBottom: "10px" }}>Người đăng : {popupMoodle.fullname}</div>
    //                 <div className="content" dangerouslySetInnerHTML={{ __html: popupMoodle.mess }}></div>
    //             </div>
    //         </div >

    //     </div >
    // }


    const renderPopup = () => {
        return <div>
            <div style={backCover} onClick={() => setPopup(null)}></div>
            <div style={{ padding: "20px", borderRadius: "7px" }} className="dialog-popup">
                <p style={{ textAlign: "center", fontWeight: "500" }}>Bạn có muốn xóa bài viết không?</p>
                <div className="row" style={{ justifyContent: "space-around" }}>
                    <div type="button" className="col-4" style={{ textAlign: "center", fontWeight: "500", background: "#f1f2f4", color: "rgb(24, 70, 139)", padding: "5px", borderRadius: "2px" }} onClick={() => setPopup(null)}>Hủy</div>
                    <div type="button" className="col-4" style={{ textAlign: "center", fontWeight: "500", background: "rgb(24, 70, 139)", color: "white", padding: "5px", borderRadius: "2px" }} onClick={() => Delete_API(popup)}>Có</div>
                </div>
            </div>
        </div>
    }

    const renderTag = () => {
        if (loadding)
            return <div class="d-flex justify-content-center">
                <div class="spinner-border" style={{ margin: "10px", width: "3rem", height: "3rem" }} role="status" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>

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

                                <div>
                                    <div class="card-body" style={{ padding: "0.75rem 0.75rem 0 0.75rem" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <div className="card-text">
                                                <img width="40px" height="40px" src={forum.AvartaOwn} style={{ borderRadius: "40px", border: "1px solid #dfdfdf" }} />
                                            </div>
                                            <div style={{ paddingLeft: "10px" }}>

                                                <div className="own" style={{ display: "inline-block" }}>{forum.NameOwn}</div>
                                                {forum.IDCourses !== undefined ? <span style={{ marginRight: "10px" }}><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                </svg> {forum.NameCourses}</span> : null}
                                                <div className="card-text" style={{ display: "inline-block" }}>
                                                    <small className="text-muted">
                                                        {/* <span className="time" style={{marginRight:"10px"}}>|</span> */}
                                                        <span className="time">{convertTimeAgo(forum.time)}</span>
                                                    </small>
                                                </div>
                                            </div>

                                        </div>

                                        {/* <Link to={tag === "0" ? "/forum/courses/post/" + forum.ID : "/forum/post/" + forum.ID}> */}
                                        <h4 class="card-title title" style={{ whiteSpace: "pre-wrap" }}>{forum.title}</h4>
                                        {/* </Link> */}
                                        <hr style={{ margin: "0", padding: "0" }} />
                                    </div>
                                </div>
                                {forum.image === "" ? null : <div className="card-header embed-responsive embed-responsive-4by3" style={{ borderBottom: "none" }}>
                                    <img class="card-img-top embed-responsive-item" style={{ objectFit: "cover", borderBottomLeftRadius: "7px", borderBottomRightRadius: "7px" }} src={forum.image}></img>
                                </div>}
                                <div>
                                    <div class="card-body" style={{ padding: "0 0.75rem 0.25rem 0.75rem" }}>
                                        <div className="card-text interactive" >
                                            <div className="row" style={{ margin: 0, justifyContent: "space-between" }}>
                                                <div>
                                                    <span style={forum.LikeByOwn === 1 ? { color: "red" } : null} onClick={() => LikeAndUnlikeClick(forum)} onContextMenu={(e) => e.preventDefault()} className="btn-forum" type="button">{forum.LikeByOwn === 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="red" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                                    </svg>} {forum.like} lượt thích </span>
                                                    <span onClick={() => Btn_ClickShowComment(forum)} onContextMenu={(e) => e.preventDefault()} className="btn-forum" type="button" style={{ paddingLeft: "10px" }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 18">
                                                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                                    </svg> {forum.comment} bình luận</span>
                                                </div>
                                                {forum.EmailOwn === email ? <div onClick={() => setPopup(forum)} onContextMenu={(e) => e.preventDefault()} className="btn-forum" type="button" style={{ paddingLeft: "10px" }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 18">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                    </svg> Xóa bài viết
                                                </div> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {forum.showcomment === true ? <ViewComment getComments={getComments} forum={forum} /> : null}
                            </div>
                        </div>
                        {popup !== null ? renderPopup() : null}



                    </div>

                })}
            </div>
        }
        else if (loadingMoodleC === 0 && tag === "1") {
            if (courseMoodle === null)
                return <div class="row justify-content-center" >
                    <div className="col-md-6 list-forums" style={{ textAlign: "center", marginTop: "50px", fontSize: "20px" }}>Không tìm thấy diễn đàn nào</div>
                </div>
            return <div>
                {courseMoodle.Forum.map((forum) => {
                    return <div class="row justify-content-center">
                        <div className="col-md-6 list-forums" style={{ background: "white", padding: "15px", borderRadius: "7px", boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }} >
                            {console.log(forum.name)}
                            <div style={{ fontWeight: "600" }}>{forum.name}</div>
                            <div style={{ fontSize: "15px" }}>Người đăng : {forum.fullname}</div>
                            <div className="content" dangerouslySetInnerHTML={{ __html: forum.message }}></div>

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
                <Link to="/forum" style={{background:"white",padding:"10px", boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)",borderRadius:"7px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 17">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                    </svg><span style={{margin:"0 10px"}}>Trở về</span>
                </Link>
                <Category current="Môn học" currentlink="/forum/courses" sub1="Diễn đàn" sub1link={"/forum"} />
                <div className="deadline-tag">
                    <div className="row tag">
                        <div type="button" className={"col-6 btn-deadline " + assign} onClick={() => setTag("0")} style={{ fontSize: "14px" }}> Tất cả khóa học
                        </div>
                        <div type="button" className={"col-6 btn-deadline " + moodle} onClick={() => setTag("1")}> Trang môn học
                        </div>
                    </div>
                </div>
                {/* <PostForum /> */}
                {renderTag()}
                {/* {popup && renderPopup()} */}
            </div>
        </div>
    }


    return null;
}

export default ViewForumCourse;