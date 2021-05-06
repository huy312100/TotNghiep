import React, { Component } from 'react';
import Navbar from '../../Navbar';
import "../../../../../style/Profile.css";
import Sidebar from '../../Sidebar';
import PopupAddIMG from './Popup/PopupAddIMG';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            university: "",
            fac: "",

            uniselected: "",

            editname: 0,
            editimg: 0,
            edituni: 0,

            loading: 0,

            picture: "",
            imgData: process.env.PUBLIC_URL + 'uploadimg.png'
        }

    }


    async componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/profile/view", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({
                    name: result[0].HoTen,
                    email: result[0].Email,
                    university: result[0].TenTruongDH,
                    fac: result[0].TenKhoa,
                    loading: 1
                })
                console.log(this.state.name)
            })
            .catch(error => console.log('error', error));
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

    EditName = () => {
        this.setState({ editname: 1 })
    }

    CancelEdit = () => {
        this.setState({ editname: 0,edituni:0 })
    }

    updateProfile = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var urlencoded = new URLSearchParams();
        urlencoded.append("HoTen", this.state.name);
        urlencoded.append("MaTruong", this.state.uni);
        urlencoded.append("MaKhoa", this.state.fac);
        urlencoded.append("AnhSV", "");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/profile/edit", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.message === "profile edited") {
                    alert("Đổi thành công");
                }
                this.CancelEdit();
            })
            .catch(error => console.log('error', error));
    }


    changeName = () => {
        if (this.state.editname === 0) {
            return <tr className="tb-row" onClick={this.EditName}>
                <td className="firstcol">Tên</td>
                <td>{this.state.name}</td>
                <td className="edit" >Chỉnh sửa</td>
            </tr>
        }
        else {
            return <tr>
                <td className="firstcol">Tên</td>
                <td><input name="name" value={this.state.name} onChange={this.setParams}></input></td>
                <td><span className="confirm" type="button" onClick={this.updateProfile}>Xác nhận</span><span className="cancel" type="button" onClick={this.CancelEdit}>Hủy</span></td>
            </tr>
        }
    }

    loadUni = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/university/getname", requestOptions)
            .then(response => response.json())
            .then(result => {
                var uni = result.map((value, index) => {
                    return <option key={index} value={value.MaTruong}>{value.TenTruongDH}</option>;
                })
                console.log(uni)
                this.setState({ university: uni })
            })
            .catch(error => console.log('error', error));
    }



    EditUni = () => {
        this.setState({
            edituni: 1
        })
        this.loadUni();
    }

    changeUni = () => {
        if (this.state.edituni === 0) {
            return <tr className="tb-row" onClick={this.EditUni}>
                <td className="firstcol">Trường</td>
                <td>{this.state.university}</td>
                <td className="edit" >Chỉnh sửa</td>
            </tr>
        }
        else {
            return <tr>
                <td className="firstcol">Trường</td>
                <td><select className="form-control" name="uniselected" onChange={this.setParams} value={this.state.uniselected}>
                    <option>Chọn trường</option>
                    {this.state.university}
                </select></td>
                <td><span className="confirm" type="button" onClick={this.updateProfile}>Xác nhận</span><span className="cancel" type="button" onClick={this.CancelEdit}>Hủy</span></td>
            </tr>
        }
    }



    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    checkPopup = () => {
        if (this.state.editimg === 0) {
            return <></>
        }
        else {
            return this.popupBox();
        }
    }

    changeIMG = () => {
        if (this.state.editimg === 0) {
            this.setState({
                editimg: 1
            })
        }
        else {
            this.setState({
                editimg: 0
            })
        }
    }

    popupBox = () => {
        return (
            <div className="popup-box">
                <div className="header">
                    <div className="title">Chọn ảnh hồ sơ</div>
                    {/* <div className="tag">Tải ảnh lên</div>
                    <div className="tag">Ảnh của bạn</div> */}
                </div>
                <div className="body">
                    <img width="150vw" height="150vh" src={this.state.imgData}></img>
                    <label className="custom-file-upload">
                        <input type="file" accept="image/png, image/jpeg" onChange={this.onChangePicture} />Chọn ảnh từ máy tính của bạn
                    </label>
                </div>
                <div className="footer">
                    <div className="btnchange" type="button">Đặt ảnh đại diện</div>
                    <div className="btncancel" type="button" onClick={this.changeIMG}>Hủy</div>
                </div>
            </div>
        );
    }


    render() {
        if (this.state.loading === 0) {
            console.log(this.state.name)
            return <></>
        }
        return (
            <div>
                <Navbar />
                <Sidebar />
                {this.checkPopup()}
                <div className="info">
                    <h3>Thông tin cá nhân</h3>
                    <hr />

                    <table>
                        <colgroup>
                            <col style={{ width: "20%" }} />
                            <col style={{ width: "65%" }} />
                            <col style={{ width: "25%" }} />
                        </colgroup>
                        <tbody>
                            <tr className="tb-row" onClick={this.changeIMG}>
                                <td className="firstcol">Ảnh</td>
                                <td style={{ color: "grey" }}>Thêm hình ảnh để cá nhân hóa tài khoản</td>
                                <td><img className="image" width="50vw" height="50vh" src="https://i.pinimg.com/originals/a4/f8/f9/a4f8f91b31d2c63a015ed34ae8c13bbd.jpg"></img></td>
                            </tr>

                            {this.changeName()}

                            <tr className="tb-row">
                                <td className="firstcol">Email</td>
                                <td>{this.state.email}</td>
                                <td></td>
                            </tr>
                            {this.changeUni()}
                            <tr className="tb-row">
                                <td className="firstcol">Khoa</td>
                                <td>{this.state.fac}</td>
                                <td ><div className="edit">Chỉnh sửa</div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Profile;
