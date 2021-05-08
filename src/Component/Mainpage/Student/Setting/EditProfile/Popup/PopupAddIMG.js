import React, { Component } from 'react';
import "../../../../../../style/PopupAddIMG.css";

class PopupAddIMG extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: "",
            imgData: process.env.PUBLIC_URL + 'uploadimg.png'
        }
    }


    onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            this.setState({
                picture: e.target.files[0]
            });
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                this.setState({
                    imgData: reader.result
                });
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    render() {
        return (
            <div className="popup-box">
                <div className="header">
                    <div className="title">Chọn ảnh hồ sơ</div>
                    {/* <div className="tag">Tải ảnh lên</div>
                    <div className="tag">Ảnh của bạn</div> */}
                </div>
                <div className="body">
                    <img width="150vw" height="150vh" src={this.state.imgData} alt=""></img>
                    <label className="custom-file-upload">
                        <input type="file" accept="image/png, image/jpeg" onChange={this.onChangePicture} />Chọn ảnh từ máy tính của bạn
                    </label>
                </div>
                <div className="footer">
                    <div className="btnchange" type="button">Đặt ảnh đại diện</div>
                    <div className="btncancel" type="button">Hủy</div>
                </div>
            </div>
        );
    }
}

export default PopupAddIMG;