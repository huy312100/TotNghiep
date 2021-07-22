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


    const email = useSelector(state => state.authen.email)


    useEffect(() => {

        getTopic()
        getComments()
        // console.log(location);
    }, [])

    const getTopic = () => {
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
                console.log(result)
                var clean = result.filter((result, index, self) =>
                    index === self.findIndex((t) => (t.ID === result.ID)))
                setTopic(clean)
                setLoadingtopic(0)
            })
            .catch(error => console.log('error', error));
    }

    const getComments = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/forum/viewcmt", requestOptions)
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
        fetch("https://hcmusemu.herokuapp.com/forum/like", requestOptions)
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
        const view = topics.map((topic) => {
            const like = topic.LikeByOwn === 0 ? <div type="button" onClick={LikeAndUnlikeClick}>Thích</div>
                : <div type="button" className="like" onClick={LikeAndUnlikeClick}>Đã thích</div>;
            if (topic.ID == id)
                return <div className="list-forums flex">
                    <img width="100vw" height="100vw" src={topic.image}></img>
                    <div>
                        <div className="flex">
                            <span className="title">{topic.title}</span>
                            <span className="time">{convertTimeAgo(topic.time)}</span>
                        </div>
                        <div className="own flex">
                            <span>Đăng tải bởi</span>
                            <img width="14px" height="14px" src={topic.AvartaOwn} />
                            <span>{topic.NameOwn}</span>
                        </div>
                        <div className="interactive">
                            <span><i className="fa fa-heart-o"></i> {topic.like} lượt thích </span>
                            <span><i className="fa fa-comment-o"></i> {topic.comment} bình luận</span>
                        </div>
                        {like}
                    </div>
                </div>
            return null;
        })

        return view;
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

        await fetch("https://hcmusemu.herokuapp.com/forum/cmt", requestOptions)
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
                {imgData !== null ? <img width="200vw" height="200vw" src={imgData} /> : null}
                {imgData !== null ? <span type="button" onClick={removeImageComment}>Xóa</span> : null}

                <div>
                    <span><label style={{fontSize:"28px"}} for="files" class="btn"><i className="fa fa-file-image-o"></i></label></span>
                    <input width="0vw" id="files" type="file" style={{ display: "none" }} accept="image/png, image/jpeg" onChange={(e) => onChangePicture(e)} />

                    <input className="input-comment" type="text" placeholder="Nhập bình luận" value={newcomment} required onChange={(e) => SetNewcomment(e.target.value)} onKeyDown={handleNewcomment} />
                </div>
                {comments.map((comment) => {
                    const user = comment.EmailOwn === email ? " own" : "";
                    const remove = comment.EmailOwn === email ? <div type="button" onClick={() => RemoveComment_API(comment.ID)}>Xóa bình luận</div> : null;
                    return <div className="list-forums flex">
                        <div style={{width:"60vw"}} className={"list-forums " + user} >
                            <div className="flex">
                                <img width="30px" height="30px" src={comment.AvartOwn} />
                                <span>{comment.NameOwn}</span>
                                <span className="time">{convertTimeAgo(comment.time)}</span>

                            </div>
                            <img width="300vw" height="300vw" src={comment.image} />
                            <div className="own flex">
                                <span className={"title comment" + user}>{comment.comment}</span>
                            </div>
                        </div>
                        {remove}
                    </div>
                })}
            </div>
        </div>
    return null;
}

export default ViewComment;