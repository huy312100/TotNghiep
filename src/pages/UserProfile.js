import React, { Component } from 'react';
import NavBar from '../Navigation/NavBar';
import {withStyles} from "@material-ui/styles"
import {Toolbar, Button} from "@material-ui/core"
import PropTypes from 'prop-types';
import clsx from 'clsx';
import 'font-awesome/css/font-awesome.min.css';
import DefaultPicture from "../images/default.png"
import LoadingScreen from '../components/shared/LoadingScreen';
const useStyles = () => ({
  center: {
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh"
  },
  root:  {
    marginLeft: "200px",
    flexGrow: 1,
  },
  info_profile: {
    width: "80vw", 
    margin: "76px 17.5vw", 
    background: "#fff", 
    padding: "20px", 
    borderRadius: "10px", 
    boxShadow: "0px 1px 2px grey"
  },
  info_profile_hr: {
    borderTop: "1px solid gray"
  },
  info_profile_table: {
    borderCollapse: "collapse", 
    width: "100%"
  },
  info_profile_th: {
    fontSize: "20px", 
    padding: "8px", 
    textAlign: "left", 
    borderBottom: "1px solid #ddd"
  },
  info_profile_td: {
    padding: "15px 0px 15px 5px"
  },
  info_profile__firstcol: {
    fontWeight: "bold", 
    paddingLeft: "20px"
  },
  info_profile__tb_row_hover: {
    background: "rgb(243, 243, 243)", 
    cursor: "pointer"
  },
  info_profile__edit: {
    color: "rgb(71, 71, 194)"
  },
  info_profile__confirm: {
    margin: "2px", 
    padding: "5px", 
    background: "#304f8d", 
    color: "white",
    width: "100px"
  },
  info_profile__cancel: {
    margin: "2px", 
    padding: "4px", 
    background: "#ffffff", 
    border: "1px solid",
    width: "100px"
  },
  info_profile__image: {
    borderRadius: "100px"
  },
  info_profile_input: {
    width: "45vw"
  },
  popup_box_image: {
    position: "fixed", 
    width: "50vw", 
    height: "70vh", 
    top: "50%", 
    left: "50%", 
    marginTop: "-30vh", 
    marginLeft: "-20vw", 
    background: "white", 
    border: "1px solid gray", 
    boxShadow: "2px 2px 10px 0px rgb(197, 197, 197)", 
    overflow: "hidden"
  },
  popup_box_image__header: {
    boxShadow: "0px 1px 2px 0px rgb(197, 197, 197)"
  },
  popup_box_image__btnchange: {
    alignItems: "center",
    padding: "5px", 
    color: "white", 
    background: "#4a8cf8",
    textAlign: "center",
    justifyContent: 'center'
  },
  btncancel: {
    display: "inline-block", 
    border: "1px solid gray", 
    margin: "0 0 1px 10px", 
    fontSize: "15px", 
    fontWeight: "600",
    textAlign: "center"
  },
  popup_box_image__btncancel: {
    padding: "5px 20px",
    textAlign: "center",
    justifyContent: 'center'
  },
  popup_box_image__title: {
    padding: "15px", 
    fontSize: "20px", 
    fontWeight: "400"
  },
  popup_box_image_input_type__file: {
    display: "none"
  },
  popup_box_image__custom_file_upload: {
    border: "1px solid #ccc", 
    padding: "3px 6px", 
    cursor: "pointer"
  },
  popup_box_image__body: {
    height: "50vh", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "column", 
    overflow: "hidden", 
    borderBottom: "1px solid grey"
  },
  popup_box_image__body_img: {
    margin: "10px"
  },
  popup_box_image__footer: {
    margin: "10px"
  },
  
});
class Profile extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            university: "",
            fac: "",
            
            listuniversity:[],
            listfaculty:[],

            uniselected: "",
            facselected: "",

            editname: 0,
            editimg: 0,
            edituni: 0,
            editfac:0,

            loading: 0,                                      

            picture: "",
            imgData: DefaultPicture,
            notUpdatedProfile: "",
        }

    }


    async componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") );

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/profile/view", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    name: result[0].HoTen,
                    email: result[0].Email,
                    university: result[0].TenTruongDH,
                    fac: result[0].TenKhoa,
                    picture: result[0].AnhSV,
                    imgData: result[0].AnhSV,
                    loading: 1,
                    facselected:result[0].MaKhoa,
                    uniselected:result[0].MaTruong,
                    notUpdatedProfile: result[0].AnhSV,

                })
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
        this.setState({ editname: 0,edituni:0,editfac:0, editimg: 0 })
    }

    updateProfile = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var urlencoded = new URLSearchParams();
        urlencoded.append("HoTen", this.state.name);
        urlencoded.append("MaTruong", this.state.uniselected);
        urlencoded.append("MaKhoa", this.state.facselected);
        urlencoded.append("AnhSV", this.state.picture);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/profile/edit", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message === "profile edited") {
                    window.location.reload();
                }
                this.CancelEdit();
            })
            .catch(error => console.log('error', error));
    }

    
    changeName = () => {
      const {classes} = this.props
        if (this.state.editname === 0) {
            return <tr className={classes.info_profile__tb_row_hover} onClick={this.EditName}>
                <td className={clsx(classes.info_profile__firstcol,classes.info_profile_td)}>Tên</td>
                <td className={classes.info_profile_td}>{this.state.name}</td>
                <td className={clsx(classes.info_profile__edit,classes.info_profile_td)}>Chỉnh sửa</td>
            </tr>
        }
        else {
            return <tr>
                <td className={clsx(classes.info_profile__firstcol,classes.info_profile_td)}>Tên</td>
                <td className={classes.info_profile_td}><input className={classes.info_profile_input} name="name" value={this.state.name} onChange={this.setParams}></input></td>
                <td>
                    <Button className={classes.info_profile__confirm} onClick={this.updateProfile}>Xác nhận</Button>
                    <Button className={classes.info_profile__cancel} onClick={this.CancelEdit}>Hủy</Button>
                </td>
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
                this.setState({ listuniversity: uni })
            })
            .catch(error => console.log('error', error));
    }

    loadingFaculty = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("MaTruong", this.state.uniselected);
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
        const {classes} = this.props
        if (this.state.edituni === 0) {

            return <tr className= {classes.info_profile__tb_row_hover} onClick={this.EditUni}>
                <td className={clsx(classes.info_profile_td,classes.info_profile__firstcol)}>Trường</td>
                <td className={classes.info_profile_td}>{this.state.university}</td>
                <td className={clsx(classes.info_profile__edit,classes.info_profile_td)} >Chỉnh sửa</td>
            </tr>
        }
        else {
            return <tr>
                <td className={clsx(classes.info_profile__tb_row_hover,classes.info_profile_td)}>Trường</td>
                <td className={classes.info_profile_td}>
                    <select fontSize="20px" className="form-control" name="uniselected" onChange={this.setParams} value={this.state.uniselected}>
                    {this.state.listuniversity}
                    </select>
                </td>
                <td className={classes.info_profile_td}>
                    <Button className={classes.info_profile__confirm} onClick={this.updateProfile}>Xác nhận</Button>
                    <Button className="cancel"  onClick={this.CancelEdit}>Hủy</Button>
                </td>
            </tr>
        }
    }

    changeFac = () => {
        const {classes} = this.props
        if (this.state.editfac === 0) {
            return <tr className={classes.info_profile__tb_row_hover} onClick={this.EditFac}>
                <td className={clsx(classes.info_profile_td,classes.info_profile__firstcol)}>Khoa</td>
                <td className={classes.info_profile_td}>{this.state.fac}</td>
                <td className={clsx(classes.info_profile_td,classes.info_profile__edit)} >Chỉnh sửa</td>
            </tr>
        }
        else {
            return <tr>
                <td className={clsx(classes.info_profile_td,classes.info_profile__firstcol)}>Khoa</td>
                <td className={classes.info_profile_td}>
                    <select className="form-control" name="facselected" onChange={this.setParams} value={this.state.facselected}>
                    {this.state.listfaculty}
                     </select>
                </td>
                <td className={classes.info_profile_td}>
                    <Button className={classes.info_profile__confirm} onClick={this.updateProfile}>Xác nhận</Button>
                    <Button className={classes.info_profile__cancel} onClick={this.CancelEdit}>Hủy</Button></td>
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
        //var img = this.state.notUpdatedProfile;
        //this.setState({picture:this.state.notUpdatedProfile})
    }
    deleteIMG = async () => {
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

    uploadIMG = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        console.log(this.state.picture);
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
    
    updateImage = async() => {

       await this.deleteIMG();
        await this.uploadIMG();
        window.location.reload();
    }
    popupBox = () => 
    { 
        const {classes } = this.props;
        return (
            <div className={classes.popup_box_image}>
            <div className={classes.popup_box_image__header}>
                <div className={classes.popup_box_image__title}>Chọn ảnh hồ sơ</div>
                {}
            </div>
            <div className={classes.popup_box_image__body}>
                <img className={classes.popup_box_image__body_img} width="150vw" height="150vh" src={this.state.imgData} alt=""></img>
                <label className={classes.popup_box_image__custom_file_upload}>
                    <input className={classes.popup_box_image_input_type__file} type="file" accept="image/png, image/jpeg, image/jpg, img/tiff" onChange={this.onChangePicture} />
                    Chọn ảnh từ máy tính của bạn
                </label>
            </div>
            <div className= {classes.popup_box_image__footer}>
                <button type="button" className={classes.popup_box_image__btnchange}  onClick={this.updateImage}>Đặt ảnh đại diện</button>
                <button type="button" className={classes.popup_box_image__btncancel} onClick={this.changeIMG}>Hủy</button>
            </div>
        </div>
        );
    }

 
    render() {
        const {classes} = this.props
        if (this.state.loading === 0) {
            return <div><LoadingScreen/></div>
        }
        return (
            <div>
               <NavBar/>
               <Toolbar/>
               <div>
                {this.checkPopup()}
                <div className={classes.info_profile}>
                    <h1>Thông tin cá nhân</h1>
                    <hr className={classes.info_profile_hr} />

                    <table className= {classes.info_profile_table}>
                        <colgroup>
                            <col style={{ width: "25%" }} />
                            <col style={{ width: "50%" }} />
                            <col style={{ width: "25%" }} />
                        </colgroup>
                        <tbody>
                            <tr className={classes.info_profile__tb_row_hover} onClick={this.changeIMG}>
                                <td className={clsx(classes.info_profile_td,classes.info_profile__firstcol)}>Ảnh</td>
                                <td className={classes.info_profile_td} style={{ color: "grey" }}>Thêm hình ảnh để cá nhân hóa tài khoản</td>
                                <td className={classes.info_profile_td}>
                                    <img className={classes.info_profile__image} width="80vw" height="80vh" src={this.state.picture} alt="">
                                    </img>
                                </td>
                            </tr>

                            {this.changeName()}

                            <tr className={classes.info_profile__tb_row_hover}>
                                <td className={clsx(classes.info_profile__firstcol,classes.info_profile_td)}>Email</td>
                                <td className={classes.info_profile_td}>{this.state.email}</td>
                                <td className={classes.info_profile_td}></td>
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


Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(useStyles)(Profile);
