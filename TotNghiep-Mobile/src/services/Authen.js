import {Alert } from "react-native";
export const SetChangeFirstSignIn = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/account/setchangefirst", requestOptions)
    .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes]) => {
        if(statusCode === 200){
            console.log(dataRes);
        }
        else {

        }
    }).catch(error => console.log('error', error));
};

export const ForgetPassword = async (emailapp, emailreset, {navigation}) =>{

    let details = {
        emailApp: emailapp,
        emailReset: emailreset
    };
  
    let formBody = [];

    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch("https://hcmusemu.herokuapp.com/account/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
    }) .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes]) => {
        console.log(statusCode,dataRes);
        if(statusCode === 200){
            navigation.navigate('Confirm Mail Sent');
        }
        else{Alert.alert("Tài khoản liên kết không tồn tại. Vui lòng nhập lại");}
    }).catch(error => console.log('error', error));
};