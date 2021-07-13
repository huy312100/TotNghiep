import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "../../../../../style/Forum.css";
import Forum from './Forum';
import PostForum from './PostForum';


function ViewForums() {
    let history = useHistory();

    const [forums, setForums] = useState(null);
    const [loading, setLoading] = useState(1);
    const email = useSelector(state => state.authen.email)


    useEffect(() => {
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
                setForums(clean)
                setLoading(0)
            })
            .catch(error => console.log('error', error));
    }, [])


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

    const viewComment = (id) => {

        history.push("forum/" + id);

    }

    const Delete_API = (removeid) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", removeid);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const items = [...forums];
        const temp = [...forums];
        const j = items.findIndex(item => item.ID === removeid);

        items.splice([j], 1);

        // rm company node if it have no items

        setForums(items)

        fetch("https://hcmusemu.herokuapp.com/forum/delete", requestOptions)
            .then(response => {
                if (response.ok)
                    return response.text()
                throw Error("Đã xảy ra lỗi khi xóa bài viết")
            })
            .catch(error => setForums(temp));
    }


    if (loading === 0)
        return <div className="forum">
            <PostForum />
            {forums.map((forum) => {
                const remove = forum.EmailOwn === email ? <div type="button" onClick={() => Delete_API(forum.ID)} >Xóa bài viết</div> : null;
                return <div className="list-forums flex">
                    <img width="100vw" height="100vw" src={forum.image}></img>
                    <div>
                        <div className="flex">
                            <span type="button" title={forum.title} className="title" onClick={() => viewComment(forum.ID)}>{forum.title}</span>
                            <span className="time">{convertTimeAgo(forum.time)}</span>
                        </div>
                        <div className="own flex">
                            <span>Đăng tải bởi</span>
                            <img width="14px" height="14px" src={forum.AvartaOwn} />
                            <span>{forum.NameOwn}</span>
                            <span>({forum.EmailOwn})</span>
                        </div>
                        <div className="interactive">
                            <span><i className="fa fa-heart-o"></i> {forum.like} lượt thích </span>
                            <span><i className="fa fa-comment-o"></i> {forum.comment} bình luận</span>
                        </div>
                        {remove}
                    </div>
                </div>
            })}
        </div>;

    return null;
}

export default ViewForums;