import React, { Component } from 'react';
import Navbar from '../../Navbar';
import "../../../../../style/Profile.css";
import Sidebar from '../../Sidebar';
// import PopupAddIMG from './Popup/PopupAddIMG';
import "../../../../../style/PopupAddIMG.css";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: "",
            name: "",
            email: "",
            university: "",
            fac: "",

            listuniversity: [],
            listfaculty: [],

            uniselected: "",
            facselected: "",

            editname: 0,
            editimg: 0,
            edituni: 0,
            editfac: 0,

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
            redirect: 'follow',
            mode: 'cors'
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
                    avatar: result[0].AnhSV,
                    loading: 1,
                    facselected: result[0].MaKhoa,
                    uniselected: result[0].MaTruong
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
        this.setState({ editname: 0, edituni: 0, editfac: 0 })
    }

    updateProfile = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var urlencoded = new URLSearchParams();
        urlencoded.append("HoTen", this.state.name);
        urlencoded.append("MaTruong", this.state.uniselected);
        urlencoded.append("MaKhoa", this.state.facselected);
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
                    window.location.reload();
                    // alert("Đổi thành công");
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
                this.setState({ listuniversity: uni })
            })
            .catch(error => console.log('error', error));
    }

    loadingFaculty = () => {
        // console.log(this.state.uniselected)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("MaTruong", this.state.uniselected);
        // console.log(this.state.uniselected)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/faculty/getname", requestOptions)
            .then(response => response.json())
            .then(result => {
                var fa = result.map((value, index) => {
                    return <option key={index} value={value.MaKhoa}>{value.TenKhoa}</option>;
                })
                // console.log(fa)
                this.setState({ listfaculty: fa })
            })
            .catch(error => console.log('error', error));
    }



    EditUni = () => {
        this.setState({
            edituni: 1
        })
        this.loadUni();
    }

    EditFac = () => {
        this.setState({
            editfac: 1
        })
        this.loadingFaculty();
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
                    {/* <option>Chọn trường</option> */}
                    {this.state.listuniversity}
                </select></td>
                <td><span className="confirm" type="button" onClick={this.updateProfile}>Xác nhận</span><span className="cancel" type="button" onClick={this.CancelEdit}>Hủy</span></td>
            </tr>
        }
    }

    changeFac = () => {
        if (this.state.editfac === 0) {
            return <tr className="tb-row" onClick={this.EditFac}>
                <td className="firstcol">Khoa</td>
                <td>{this.state.fac}</td>
                <td className="edit" >Chỉnh sửa</td>
            </tr>
        }
        else {
            return <tr>
                <td className="firstcol">Khoa</td>
                <td><select className="form-control" name="facselected" onChange={this.setParams} value={this.state.facselected}>
                    {/* <option>Chọn khoa</option> */}
                    {this.state.listfaculty}
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

    deleteImage_API = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/profile/deleteimg", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    updateImage_API = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var formdata = new FormData();
        formdata.append("image", this.state.picture);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/profile/uploadimg", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                this.setState({ editimg: 0 })
            })
            .catch(error => console.log('error', error));
    }

    updateImage = async () => {
        await this.deleteImage_API();
        await this.updateImage_API();
        window.location.reload();
    }

    popupBox = () => {
        return (
            <div className="popup-box-image">
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
                    <div className="btnchange" type="button" onClick={this.updateImage}>Đặt ảnh đại diện</div>
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
                {/* <Navbar />
                <Sidebar /> */}
                <div className="col-12">
                    {this.checkPopup()}
                    <div className="info-profile">
                        <h3>Thông tin cá nhân</h3>
                        <hr />

                        <table>
                            <colgroup>
                                <col style={{ width: "25%" }} />
                                <col style={{ width: "65%" }} />
                                <col style={{ width: "15%" }} />
                            </colgroup>
                            <tbody>
                                <tr className="tb-row" onClick={this.changeIMG}>
                                    <td className="firstcol">Ảnh</td>
                                    <td style={{ color: "grey" }}>Thêm hình ảnh để cá nhân hóa tài khoản</td>
                                    <td><img className="image" width="50vw" height="50vh" src={this.state.avatar} alt=""></img></td>
                                </tr>

                                {this.changeName()}

                                <tr className="tb-row">
                                    <td className="firstcol">Email</td>
                                    <td>{this.state.email}</td>
                                    <td></td>
                                </tr>
                                {this.changeUni()}
                                {this.changeFac()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
