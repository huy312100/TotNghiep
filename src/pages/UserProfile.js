import React, {useState,useEffect } from 'react';
import NavBar from '../Navigation/NavBar';
import { makeStyles } from '@material-ui/core/styles';
import {Toolbar, Button,Input} from "@material-ui/core"
import clsx from 'clsx';
import 'font-awesome/css/font-awesome.min.css';
import DefaultPicture from "../images/default.png"
import LoadingScreen from '../components/shared/LoadingScreen';
import {useHistory} from "react-router-dom"
import checkTokenExpired from '../ValidAccess/AuthToken';
import { Alert } from 'react-native';
const useStyles = makeStyles((theme) => ({
    
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
  toolbar: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  info_profile: {
    width: "80vw", 
    margin: "auto",
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
    width: "100%",
    textAlign: "center"
  },
  info_profile_th: {
    fontSize: "20px", 
    padding: "8px", 
    textAlign: "left", 
    borderBottom: "1px solid #ddd"
  },
  info_profile_td: {
    padding: "15px 0px 15px 5px",
    fontSize: "20px"
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
  
}));

export default function Profile() {
    const classes = useStyles();
    const history = useHistory();
    
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [uni,setUni] = useState("");
    const [fac,setFac] = useState("");
    const [listUni,setListUni] = useState([]);
    const [listFac,setListFac] = useState([]);
    const [uniSelected,setUniSelected] = useState("");
    const [facSelected,setFacSelected] = useState("");
    const [editName,setEditName] = useState(false);
    const [editImg,setEditImg] = useState(false);
    const [editUni,setEditUni] = useState(false);
    const [editFac,setEditFac] = useState(false);
    const [loading,setLoading] = useState(false);
    const [picture,setPicture] = useState(null);
    const [imgData,setImgData] = useState(DefaultPicture);

    const getUserData = async() =>{
        if (checkTokenExpired()) {
            localStorage.clear()
            history.replace("/");
            return null
        }
        if (loading === false){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/profile/view", requestOptions)
            .then(response => response.json())
            .then(result => {
                setName(result[0].HoTen);
                setEmail(result[0].Email);
                setUni(result[0].TenTruongDH);
                setFac(result[0].TenKhoa);
                setPicture(result[0].AnhSV);
                setFacSelected(result[0].MaKhoa);
                setUniSelected(result[0].MaTruong);
            })
            .catch(error => console.log('error', error));
            setLoading(true);
        }
    }
    
    useEffect(()=>{
        getUserData();
    })

    const onChangePicture = (event) => {
        if (event.target.files[0]) {
            console.log("picture: ", event.target.files[0]);
            setPicture(event.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(event.target.files[0]);
        }
       
    };
    const EditName = () => {
        setEditName(true);
    }

    const CancelEdit = () => {
        setEditName(false);
        setEditUni(false);
        setEditFac(false);
        setEditImg(false);
        
    }

    const updateProfile = async() => {
        if (checkTokenExpired()) {
            localStorage.clear()
            history.replace("/");
            return null
        }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var urlencoded = new URLSearchParams();
        urlencoded.append("HoTen", name);
        urlencoded.append("MaTruong", uniSelected);
        urlencoded.append("MaKhoa", facSelected);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/profile/edit", requestOptions)
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
          }).then(([statusCode, dataRes]) => {
            console.log(statusCode);
            if(statusCode === 200){
                Alert.alert("Đã cập nhật thông tin thành công");
                setLoading(false);
            } 
            else{
                Alert.alert("Có lỗi đổi thông tin");
            }
            CancelEdit();
          })
            .catch(error => console.log('error', error));
    }

    const changeNameValue = (e) =>{
        setName(e.target.value)
    }
    const changeName = () => {
        if (editName === false) {
            return(
            <tr className={classes.info_profile__tb_row_hover}>
                <td className={clsx(classes.info_profile__firstcol,classes.info_profile_td)}>Tên</td>
                <td className={classes.info_profile_td}>{name}</td>
                <td className={clsx(classes.info_profile__edit,classes.info_profile_td)} onClick={()=>EditName()}>
                    Chỉnh sửa
                </td>
            </tr>)
        }
        else {
            return <tr>
                <td className={clsx(classes.info_profile__firstcol,classes.info_profile_td)}>Tên</td>
                <td className={classes.info_profile_td}>
                    <input className={classes.info_profile_input} name="name" value={name} onChange={(e)=>changeNameValue(e)}>
                    </input>
                </td>
                <td>
                    <Button className={classes.info_profile__confirm} onClick={()=>updateProfile()}>
                        Xác nhận
                    </Button>
                    <Button className={classes.info_profile__cancel} onClick={()=>CancelEdit()}>
                        Hủy
                    </Button>
                </td>
            </tr>
        }
    }

    const loadUni = async() => {
        if (checkTokenExpired()) {
            localStorage.clear()
            history.replace("/");
            return null
        }
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/university/getname", requestOptions)
            .then(response => response.json())
            .then(result => {
                var uni = result.map((value, index) => {
                    return <option key={index} value={value.MaTruong}>{value.TenTruongDH}</option>;
                })
                setListUni(uni);
            })
            .catch(error => console.log('error', error));
    }

    const loadingFaculty = async() => {
        if (checkTokenExpired()) {
            localStorage.clear()
            history.replace("/");
            return null
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("MaTruong", uniSelected);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/faculty/getname", requestOptions)
            .then(response => response.json())
            .then(result => {
                var fa = result.map((value, index) => {
                    return <option key={index} value={value.MaKhoa}>{value.TenKhoa}</option>;
                })
                setListFac(fa);
            })
            .catch(error => console.log('error', error));
    }
    const EditUni = () => {
        setEditUni(true);
        loadUni();
    }

    const EditFac = () => {
        setEditFac(true);
        loadingFaculty();
    }

    const changeUniValue = (e) =>{
        setUniSelected(e.target.value);
    }

    const changeFacValue = (e) =>{
        setFacSelected(e.target.value);
    }

    const changeUni = () => {
        if (editUni === false) {

            return(<tr className= {classes.info_profile__tb_row_hover} onClick={()=>EditUni()}>
                <td className={clsx(classes.info_profile_td,classes.info_profile__firstcol)}>Trường</td>
                <td className={classes.info_profile_td}>{uni}</td>
                <td className={clsx(classes.info_profile__edit,classes.info_profile_td)} >Chỉnh sửa</td>
            </tr>)
        }
        else {
            return( <tr>
                <td className={clsx(classes.info_profile__tb_row_hover,classes.info_profile_td)}>Trường</td>
                <td className={classes.info_profile_td}>
                    <select fontSize="20px" className="form-control" name="uniselected" onChange={(e)=>changeUniValue(e)} value={uniSelected}>
                        {listUni}
                    </select>
                </td>
                <td className={classes.info_profile_td}>
                    <Button className={classes.info_profile__confirm} onClick={()=>updateProfile()}>Xác nhận</Button>
                    <Button className={classes.info_profile__cancel}  onClick={()=>CancelEdit()}>Hủy</Button>
                </td>
            </tr>)
        }
    }

    const changeFac = () => {
        if (editFac === false) {
            return <tr className={classes.info_profile__tb_row_hover} onClick={()=>EditFac()}>
                <td className={clsx(classes.info_profile_td,classes.info_profile__firstcol)}>Khoa</td>
                <td className={classes.info_profile_td}>{fac}</td>
                <td className={clsx(classes.info_profile_td,classes.info_profile__edit)} >Chỉnh sửa</td>
            </tr>
        }
        else {
            return <tr>
                <td className={clsx(classes.info_profile_td,classes.info_profile__firstcol)}>Khoa</td>
                <td className={classes.info_profile_td}>
                    <select className="form-control" name="facselected" onChange={(e)=>changeFacValue(e)} value={facSelected}>
                    {listFac}
                     </select>
                </td>
                <td className={classes.info_profile_td}>
                    <Button className={classes.info_profile__confirm} onClick={()=>updateProfile()}>Xác nhận</Button>
                    <Button className={classes.info_profile__cancel} onClick={()=>CancelEdit()}>Hủy</Button></td>
            </tr>
        }
    }


   
    const checkPopup = () => {
        if (editImg === false) {
            return null
        }
        return popupBox();
        
    }

    const changeIMG = () => {
       if (editImg === false) {
            setEditImg(true);
        }
        else {
            setEditImg(false);
            setImgData(DefaultPicture);
        }
    }
    const deleteIMG = async () => {
        if (checkTokenExpired()) {
            localStorage.clear()
            history.replace("/");
            return null
        }
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
    const uploadIMG = async () => {
        if (checkTokenExpired()) {
            localStorage.clear()
            history.replace("/");
            return null
        }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        var formdata = new FormData();
        formdata.append("image", picture);


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/profile/uploadimg", requestOptions)
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
          }).then(([statusCode, dataRes]) => {
              console.log(dataRes);
              console.log(statusCode);
            if(statusCode === 200){
                Alert.alert("Thay avatar thành công");
                setPicture(imgData);
                setEditImg(false);
            }
            else{
                Alert.alert("Error","Có lỗi xảy ra khi thay avatar rồi !!!");
                setEditImg(false);

            }
            })
            .catch(error => console.log('error', error));
    }
    
    const updateImage = async() => {
       if (picture === null){
            await uploadIMG();
       }
       else
       {
       await deleteIMG();
       await uploadIMG();
       }

    }
    const popupBox = () => 
    { 
        return (
            <div className={classes.popup_box_image}>
            <div className={classes.popup_box_image__header}>
                <div className={classes.popup_box_image__title}>Chọn ảnh hồ sơ</div>
            </div>
            <div className={classes.popup_box_image__body}>
                <img className={classes.popup_box_image__body_img} width="150vw" height="150vh" src={imgData} alt=""></img>
                <label className={classes.popup_box_image__custom_file_upload}>
                    <Input className={classes.popup_box_image_input_type__file} type="file" accept="image/png, image/jpeg, image/jpg, img/tiff" onChange={(event)=>onChangePicture(event)} />
                    Chọn ảnh từ máy tính của bạn
                </label>
            </div>
            <div className= {classes.popup_box_image__footer}>
                <button type="button" className={classes.popup_box_image__btnchange}  onClick={()=>updateImage()}>Đặt ảnh đại diện</button>
                <button type="button" className={classes.popup_box_image__btncancel} onClick={()=>changeIMG()}>Hủy</button>
            </div>
        </div>
        );
    }

    if (loading === false) {
        return(
            <div className={classes.root}>
                <NavBar/>
                <Toolbar/>
                <div className={classes.content}>
                <LoadingScreen/>
                </div>
            </div>
        )
    }
    else{
    return (
        <div className={classes.root}>
           <NavBar/>
           <Toolbar/>
           <div className={classes.content}>
            <div className={classes.info_profile}>
                <h1>Thông tin cá nhân</h1>
                <hr className={classes.info_profile_hr} />

                <table className= {classes.info_profile_table}>
                    <colgroup>
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "60%" }} />
                        <col style={{ width: "25%" }} />
                    </colgroup>
                    <tbody>
                        <tr className={classes.info_profile__tb_row_hover}  onClick={()=>changeIMG()}>
                            <td className={clsx(classes.info_profile_td,classes.info_profile__firstcol)}>
                                Ảnh
                            </td>
                            <td className={classes.info_profile_td}>
                                Thêm hình ảnh để cá nhân hóa tài khoản
                            </td>
                            <td className={classes.info_profile_td}>
                                <img className={classes.info_profile__image} width="200vw" height="200vh" src={picture === null ? DefaultPicture : picture} alt="">
                            </img>
                            </td>
                        </tr>
                        <br/>
                        {changeName()}
                        <br/>
                        <tr className={classes.info_profile__tb_row_hover}>
                            <td className={clsx(classes.info_profile__firstcol,classes.info_profile_td)}>
                                Email
                            </td>
                            <td className={classes.info_profile_td}>
                                {email}
                            </td>
                            <td className={classes.info_profile_td}>

                            </td>
                        </tr>
                        <br/>
                        {changeUni()}
                        <br/>
                        {changeFac()}
                        {checkPopup()}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
    }
}
