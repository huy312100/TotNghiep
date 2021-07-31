import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';

function ViewComment() {
    const { id } = useParams();
    const [comments, setComments] = useState(null);
    const [topics, setTopic] = useState(null);
    const [loading, setLoading] = useState(1);
    const [loadingtopic, setLoadingtopic] = useState(1);
    const [newcomment, SetNewcomment] = useState("");
    const [like, SetLike] = useState(0);
    const [image, setImage] = useState(null);
    const [imgData, setimgData] = useState(null);

    console.log("id", id)


    const email = useSelector(state => state.authen.email)


    useEffect(() => {

        getTopic()
        getComments()
        // console.log(location);
    }, [])

    const getTopic = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") + "sT");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/forum/courses/viewdetail", requestOptions)
            .then(response => response.json())
            .then(result => {
                setTopic(result[0])
                setLoadingtopic(0)
            })
            .catch(error => console.log('error', error));
    }

    const getComments = () => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();

        urlencoded.append("IDPost", id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/forum/courses/viewcmt", requestOptions)
            .then(response => response.json())
            .then(result => {
                setComments(result)
                setLoading(0)
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

    const Unlike_API = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        setTopic([...topics, topics[0].LikeByOwn = 0])
        fetch("https://hcmusemu.herokuapp.com/forum/unlike", requestOptions)
            .then(response => {
                if (response.ok)
                    response.text()
                else throw Error("Bỏ thích không thành công")
            })
            .catch(error => {
                console.log('error', error)
                setTopic([...topics, topics[0].LikeByOwn = 1])
            });
    }

    const LikeAndUnlikeClick = () => {
        if (topics[0].LikeByOwn === 0)
            Like_API()
        else Unlike_API()
    }

    const Like_API = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        setTopic([...topics, topics[0].LikeByOwn = 1])
        fetch("https://hcmusemu.herokuapp.com/forum/courses/like", requestOptions)
            .then(response => {
                if (response.ok)
                    response.text()
                else throw Error("Không thể thích bài viết");
            })
            .catch(error => {
                setTopic([...topics, topics[0].LikeByOwn = 0])

            });
    }

    const viewTopic = () => {
        return <div class="row justify-content-center" >
            <div className="col-md-6 list-forums">
                <div className="card border-0">
                    <div>
                        <div class="card-body" style={{ padding: "0.75rem" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div className="card-text">
                                    <img width="40px" height="40px" src={topics.AvartaOwn} style={{ borderRadius: "40px", border: "1px solid #dfdfdf" }} />
                                </div>
                                <div style={{ paddingLeft: "10px" }}>

                                    <div className="own" style={{ display: "inline-block" }}>{topics.NameOwn}</div>

                                    <div className="card-text" style={{ display: "inline-block" }}>
                                        <small className="text-muted">
                                            {/* <span className="time" style={{marginRight:"10px"}}>|</span> */}
                                            <span className="time">{convertTimeAgo(topics.time)}</span>
                                        </small>
                                    </div>
                                </div>

                            </div>

                            <h4 type="button" class="card-title title" >{topics.title}</h4>
                            <hr style={{ margin: "0", padding: "0" }} />
                            <div className="card-text interactive" style={{ paddingTop: "0.5rem" }}>

                                <span>{topics.LikeByOwn === 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="red" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                </svg>} {topics.like} lượt thích </span>
                                <span style={{ paddingLeft: "10px" }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 18">
                                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                </svg> {topics.comment} bình luận</span>
                            </div>
                        </div>
                    </div>
                    {topics.image === "" ? null : <div className="card-header embed-responsive embed-responsive-4by3" style={{ borderBottom: "none" }}>
                        <img class="card-img-top embed-responsive-item" style={{ objectFit: "cover", borderBottomLeftRadius: "7px", borderBottomRightRadius: "7px" }} src={topics.image}></img>
                    </div>}
                </div>
            </div>

        </div>
    }

    const handleNewcomment = (event) => {
        if (event.key === 'Enter') {
            Newcomment_API()
        }

    }

    const Newcomment_API = async () => {
        if (newcomment === "")
            return
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var formdata = new FormData();
        formdata.append("IDPost", id);
        formdata.append("comment", newcomment);
        formdata.append("image", image);


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        SetNewcomment("");

        await fetch("https://hcmusemu.herokuapp.com/forum/courses/cmt", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log('error', error));

        getComments()
        getTopic()
    }

    const RemoveComment_API = (removeid) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDCmt", removeid);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const items = [...comments];
        const temp = [...comments];
        const j = items.findIndex(item => item.ID === removeid);

        items.splice([j], 1);

        // rm company node if it have no items

        setComments(items)

        fetch("https://hcmusemu.herokuapp.com/forum/deletecmt", requestOptions)
            .then(response => {
                if (response.ok)
                    return response.text()
                throw Error("Đã xảy ra lỗi khi xóa bình luận")
            })
            .catch(error => setComments(temp));
    }

    const onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setImage(e.target.files[0])
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setimgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const removeImageComment = () => {
        setImage(null)
        setimgData(null)
    }

    if (loading === 0 && loadingtopic === 0)
        return <div className="col col-12">
            <div className="forum">
                {viewTopic()}
                <div>
                    <div class="row justify-content-center" >
                        <div className="col-md-6">
                            {imgData !== null ? <img width="200vw" height="200vw" src={imgData} /> : null}
                            {imgData !== null ? <span type="button" onClick={removeImageComment}>Xóa</span> : null}
                            <div class="row justify-content-center" style={{ background: "white", margin: "0" }}>
                                <div class="col-12" >
                                    <label style={{ fontSize: "18px" }} for="files" class="col-2 btn"><i className="fa fa-file-image-o"></i></label>
                                    <input width="0vw" id="files" type="file" style={{ display: "none" }} accept="image/png, image/jpeg" onChange={(e) => onChangePicture(e)} />

                                    <input className="col-10 input-comment" type="text" placeholder="Nhập bình luận" value={newcomment} required onChange={(e) => SetNewcomment(e.target.value)} onKeyDown={handleNewcomment} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {comments.map((comment) => {
                        const user = comment.EmailOwn === email ? " own" : "";
                        const remove = comment.EmailOwn === email ? <div type="button" onClick={() => RemoveComment_API(comment.ID)}>Xóa bình luận</div> : null;
                        return <div class="row justify-content-center" >
                            <div className="col-md-6">
                                <div className="list-forum" style={{ background: "white", padding: "10px" }}>
                                    {/* <div className={"list-forums"}> */}
                                    <div style={{ background: "#f0f3f5", padding: "10px", borderRadius: "7px" }}>
                                        <div className="flex">
                                            <img width="30px" height="30px" src={comment.AvartOwn} style={{ borderRadius: "100%" }} />
                                            <span style={{ fontWeight: "400", margin: "0 5px" }}>{comment.NameOwn}</span>
                                            <span className="comment time">{convertTimeAgo(comment.time)}</span>

                                        </div>
                                        <div className="own flex">
                                            <span className={"title comment" + user}>{comment.comment}</span>
                                        </div>
                                        {comment.image === "" ? null : <img width="300vw" height="300vw" src={comment.image} />}
                                        {/* </div> */}
                                    </div>
                                </div>
                                {/* {remove} */}
                            </div>
                        </div>
                    })}

                </div>
            </div>
        </div>
    return null;
}

export default ViewComment;