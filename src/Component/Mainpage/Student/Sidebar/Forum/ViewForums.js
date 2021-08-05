import { render } from '@testing-library/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import "../../../../../style/Forum.css";
import Category from '../../Category';
import Forum from './Forum';
import PostForum from './PostForum';
import ViewComment from './ViewComment';

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


function ViewForums() {
    let history = useHistory();

    // const [comment, setComments] = useState(false);
    const [uni, setUni] = useState(null)
    const [fac, setFac] = useState(null)

    const [course, setCourse] = useState(null)

    const [loadingMoodleC, setLoadingMoodleC] = useState(1);
    const [selfpost, setSelfpost] = useState("all")



    const [page, setPage] = useState(0)
    const [allcourse, setAllcourse] = useState([])

    const email = useSelector(state => state.authen.email)
    const [tag, setTag] = useState("0")

    const [loadding, setLoadding] = useState(true)
    const [popup, setPopup] = useState(null)



    useEffect(() => {
        // viewFacUniForums()
        viewCourseForums()

    }, [])

    // useEffect(() => {
    //     getAllCourse()
    // }, [page])

    const getAllCourse = () => {
        if (page === 0)
            setLoadingMoodleC(1)
        // setLoadding(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("page", page);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/studycourses/allcourses", requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json()
                throw new Error('Đã hết môn học');
            })
            .then(result => {
                console.log(result)
                // let temp=this.state.allcourse;
                // temp.push(result)
                // console.log("temp:",temp)
                let temp = allcourse;
                Array.prototype.push.apply(temp, result)
                setAllcourse(temp)
                setLoadingMoodleC(0)
                // setLoadding(false)
            })
            .then(() => setPage(page + 1))
            .catch(error => console.log('error', error));
    }

    const viewFacUniForums = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") + "sT");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/forum/view", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log("clean", clean)

                // var clean = result.filter(function (item) {
                //     return item.scope == "u";
                // })
                // var clean = result.filter((result, index, self) =>
                //     index === self.findIndex((t) => (t.ID === result.ID)))
                // setForums(clean)
                setUni(result.filter(function (item) {
                    return item.scope == "u";
                }))
                setFac(result.filter(function (item) {
                    return item.scope == "f";
                }))
                setLoadding(false)
            })
            .catch(error => console.log('error', error));
    }

    const viewCourseForums = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") + "sT");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/forum/courses/view", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCourse(result)
                setLoadding(false)
            })
            .catch(error => console.log('error', error));
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

    const Delete_API = (forum) => {
        setPopup(null)
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
        if (forum.scope !== undefined) {
            url = 'https://hcmusemu.herokuapp.com/forum/delete'
            if (forum.scope === "u") {
                items = [...uni];
                temp = [...uni];
                scopeFunction = setUni
            }

            else if (forum.scope === "f") {
                items = [...fac];
                temp = [...fac];
                scopeFunction = setFac
            }
        }
        else if (forum.IDCourses !== undefined) {
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
        if (forum.scope !== undefined) {
            if (forum.scope === "u") {
                items = [...uni];
                temp = [...uni];
                scopeFunction = setUni
            }

            else if (forum.scope === "f") {
                items = [...fac];
                temp = [...fac];
                scopeFunction = setFac
            }
        }
        else if (forum.IDCourses !== undefined) {
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
        if (forum.scope !== undefined) {
            if (forum.scope === "u") {
                items = [...uni];
                temp = [...uni];
                scopeFunction = setUni
            }

            else if (forum.scope === "f") {
                items = [...fac];
                temp = [...fac];
                scopeFunction = setFac
            }
        }
        else if (forum.IDCourses !== undefined) {
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
        if (forum.scope !== undefined) {
            if (forum.scope === "u") {
                items = [...uni];
                temp = [...uni];
                scopeFunction = setUni
            }

            else if (forum.scope === "f") {
                items = [...fac];
                temp = [...fac];
                scopeFunction = setFac
            }
        }
        else if (forum.IDCourses !== undefined) {
            items = [...course];
            temp = [...course];
            scopeFunction = setCourse
        }

        const index = items.findIndex(item => item.ID === forum.ID);

        items[index].showcomment = true;
        scopeFunction(items)

        // console.log(items[index])

    }

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

    const renderTagForum = (forum) => {
        if (selfpost === "self" && forum.EmailOwn !== email)
            return

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

    }


    const renderTag = () => {

        if (loadding)
            return <div class="d-flex justify-content-center">
                <div class="spinner-border" style={{ margin: "10px", width: "3rem", height: "3rem" }} role="status" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>

        // var showforums = null;
        // if (tag === "0")
        //     showforums = course;
        // else if (tag !== "1") {
        //     if (tag === "2")
        //         showforums = fac;
        //     else showforums = uni;
        // }

        // console.log("Forum", showforums)
        if (loadingMoodleC === 1 && tag === "1")
            return null;

        else if (tag === "0")
            return course.map(renderTagForum)
        // { tag === "2" ? renderTagForum(fac) : null }
        else if (tag === "2" && fac !== null)
            return fac.map(renderTagForum)

        else if (tag === "3" && fac !== null)
            return uni.map(renderTagForum)
        // { tag === "3" ? renderTagForum(uni) : null }

        else if (tag === "1")
            return <div>
                {allcourse.map((c, index) => {
                    return (
                        <div key={index} className="course">
                            <Link to={"/forum/courses/" + c.IDCourses} className="titlee direct">{c.name}</Link>
                            <div className="list-teacher">
                                {c.teacher.map((tc, tindex) => (
                                    <div key={tindex} className="content">
                                        <span>Giáo viên: </span>
                                        <span>{tc}</span>
                                    </div>))}
                            </div>
                        </div>
                    )
                })
                }
                {/* {this.LoaddingIcon()} */}
            </div>

        return null
    }

    const Btn_ClickTag = (clickedtag) => {
        if (clickedtag === "0" || clickedtag === "2" || clickedtag === "3") {
            setLoadding(true)
        }
        setTag(clickedtag)

        if (clickedtag === "0") {
            viewCourseForums()

        }
        if (clickedtag === "2" || clickedtag === "3") {
            viewFacUniForums()
        }
    }


    const render = () => {
        var assign = tag === "0" ? "assign" : "";
        var moodle = tag === "1" ? "assign" : "";
        var university = tag === "2" ? "university" : "";
        var faculty = tag === "3" ? "faculty" : "";
        return <div className="forum">
            <Category current="Diễn đàn" currentlink="/forum" />
            <div style={{ display: "flex", alignItems: "center" }}>

                <PostForum post={Btn_ClickTag} allcourse={allcourse} />
                <div type="button" onClick={() => setSelfpost("all")} style={{ margin: "5px 10px 0 10px" }}>
                    <input type="radio" id="all" name="viewpost" value="all" checked={selfpost === "all"} />
                    <label type="button" style={{ fontSize: "16px", margin: "0 5px" }} for="all">Tất cả bài viết</label>
                </div>

                <div type="button" onClick={() => setSelfpost("self")} style={{ margin: "5px 10px 0 10px" }}>
                    <input type="radio" id="self" name="viewpost" value="self" checked={selfpost === "self"} />
                    <label type="button" style={{ fontSize: "16px", margin: "0 5px" }} for="self">Bài viết của bản thân</label>
                </div>
            </div>
            <div className="deadline-tag">
                <div className="row tag">
                    <div type="button" className={"col-6 col-md-3 btn-deadline " + assign} onClick={() => Btn_ClickTag("0")} style={{ fontSize: "14px" }}> Tất cả khóa học
                    </div>
                    <div type="button" className={"col-6 col-md-3 btn-deadline " + moodle} onClick={() => Btn_ClickTag("1")}> Môn học
                    </div>
                    <div type="button" className={"col-6 col-md-3 btn-deadline " + university} onClick={() => Btn_ClickTag("2")}> Khoa
                    </div>
                    <div type="button" className={"col-6 col-md-3 btn-deadline " + faculty} onClick={() => Btn_ClickTag("3")}> Trường
                    </div>
                </div>
            </div>
            {/* <PostForum /> */}

            {renderTag()}
        </div >;
    }

    return render();
}



export default ViewForums;