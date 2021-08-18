import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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

function PostForum(props) {
    const [popUp, setpopUp] = useState(false)
    const [image, setImage] = useState(null);
    const [imgData, setimgData] = useState(null);
    const [scope, setScope] = useState("u");
    const [title, setTitle] = useState("");
    const [course, setCourse] = useState(null)
    const moodle = useSelector(state => state.info.moodle)

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
        if (title === "" && image === null)
            return null
        setpopUp(false)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var formdata = new FormData();
        formdata.append("title", title);
        formdata.append("image", image);

        var tag
        var url
        console.log(scope)
        console.log(course)
        if (scope === "u" || scope === "f") {
            formdata.append("scope", scope);
            url = "https://hcmusemu.herokuapp.com/forum/post"
            if (scope === "u")
                tag = "3"
            else tag = "2"

        }
        else if (scope === "c") {
            if (course === "0" || course===null) return
            formdata.append("IDCourses", course);
            url = "https://hcmusemu.herokuapp.com/forum/courses/post"
            tag = "0"
        }
        else return

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };


        setTitle("")
        setImage(null)
        setimgData(null)
        fetch(url, requestOptions)
            .then(response => {
                if (response.ok)
                    return response
                throw new Error("Đã xảy ra lỗi khi thêm bài viết")
            })
            .then(result => {
                console.log(result)
                props.post(tag)
            })
            .catch(error => console.log('error', error));
    }

    const RemoveImage = () => {
        setImage(null)
        setimgData(null)
    }

    const HandleCourse = (value) => {
        setCourse(value)
        // console.log(course)
    }

    const AddPost = () => {
        if (popUp)
            return <div>
                <div style={backCover} onClick={() => setpopUp(null)}></div>
                <div className="popup">
                    <div className="col-12">
                        {/* <label className="header">Tiêu đề</label> */}
                        {/* <input className="title" onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tên bài viết" /> */}
                        <textarea name="Text1" rows="4" className="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nội dung bài viết" ></textarea>
                    </div>
                    <div style={{ borderRadius: "7px", border: "1px solid rgb(216, 214, 222)", padding: "10px" }}>
                        <label className="header">Hình ảnh</label>
                        <div>
                            {imgData !== null ? <img alt="" style={{ borderRadius: "7px" }} width="150vw" height="100vw" src={imgData}></img> : <svg xmlns="http://www.w3.org/2000/svg" width="150" height="100" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                            </svg>}
                            <label style={{ border: "1px solid #18468b", textAlign: "center", borderRadius: "7px", color: "#18468b", fontSize: "14px", padding: "5px", margin: "5px" }} for="forumfile" className="btn">Chọn ảnh</label>
                            {image !== null ? <div onClick={() => RemoveImage()} style={{ border: "1px solid #a9a7b0", padding: 0, margin: 0, textAlign: "center", borderRadius: "7px", color: "#a9a7b0", fontSize: "14px", padding: "5px", margin: "5px" }} className="btn">Xóa ảnh</div> : null}

                            <input id="forumfile" hidden type="file" accept="image/png, image/jpeg" onChange={(e) => onChangePicture(e)} />
                        </div>
                        {image !== null ? <span style={{ fontSize: "12px", overflowWrap: "break-word" }}>{image.name}</span> : null}

                    </div>
                    <div style={{ borderRadius: "7px", border: "1px solid rgb(216, 214, 222)", padding: "10px", margin: "10px 0" }}>
                        <label className="header">Phạm vi bài viết</label>
                        <div className="row" style={{ margin: 0 }}>
                            <select className="col select-scope" value={scope} onChange={(e) => setScope(e.target.value)} >
                                <option value="u">Trường</option>
                                <option value="f">Khoa</option>
                                {moodle === true ? <option value="c">Môn học</option> : null}
                            </select>
                            {scope === "c" ? <select className="col select-scope" value={course} onChange={(e) => HandleCourse(e.target.value)} >
                                <option value={0}>Chọn môn</option>
                                {props.allcourse.map((element) => {
                                    return <option value={element.IDCourses}>{element.name}</option>
                                })}
                            </select> : null}
                        </div>
                    </div>

                    <div className="row" style={{ justifyContent: "space-around" }}>
                        <div className="col-md-4 btn-cancel-post" type="button" onClick={() => setpopUp(false)}>Hủy</div>
                        <div className="col-md-4 btn-add-post" type="button" onClick={AddPost_API}>Thêm bài viết</div>
                    </div>
                </div>
            </div>
    }

    return <div className="post-forum">
        <div className="btn-post" type="button" onClick={() => setpopUp(true)}><i className="fa fa-plus" /> Thêm bài viết</div>
        {AddPost()}
    </div>
}

export default PostForum;