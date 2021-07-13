import React, { useEffect, useState } from 'react';

function PostForum() {
    const [popUp, setpopUp] = useState(-1)
    const [image, setImage] = useState(null);
    const [imgData, setimgData] = useState(process.env.PUBLIC_URL + 'uploadimg.png');
    const [scope, setScope] = useState("u");
    const [title, setTitle] = useState("");

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

    const AddPost_API = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var formdata = new FormData();
        formdata.append("title", title);
        formdata.append("image", image);
        formdata.append("scope", scope);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };



        fetch("https://hcmusemu.herokuapp.com/forum/post", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => console.log('error', error));
    }

    const AddPost = () => {
        if (popUp === 1)
            return <div className="popup">
                <div>
                    {/* <label className="header">Tiêu đề</label> */}
                    <input className="title" onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tên bài viết" />
                </div>
                <div>
                    <label className="header">Ảnh</label>
                    <div>
                        <img width="100vw" height="100vw" src={imgData}></img>
                        <input type="file" accept="image/png, image/jpeg" onChange={(e) => onChangePicture(e)} />
                    </div>
                </div>
                <div>
                    <label className="header">Phạm vi bài viết</label>
                    <select className="select-scope" value={scope} onChange={(e) => setScope(e.target.value)} >
                        <option value="u">Trường</option>
                        <option value="f">Khoa</option>
                    </select>
                </div>
                <div className="button-popup">
                    <span className="btn-add-post" type="button" onClick={AddPost_API}>Thêm bài viết</span>
                    <span className="btn-cancel-post" type="button" onClick={() => setpopUp(-1)}>Hủy</span>
                </div>
            </div>
    }

    return <div className="post-forum">
        <div className="btn-post" type="button" onClick={() => setpopUp(popUp * -1)}><i className="fa fa-plus" /> Thêm bài viết</div>
        {AddPost()}
    </div>
}

export default PostForum;