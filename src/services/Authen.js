export const login=async(username, password)=>{

    let details = {
        'username': username,
        'password': password
    };
  
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
  
    await fetch('https://hcmusemu.herokuapp.com/account/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([statusCode, data])=>{
        console.log(statusCode, data);
        return data;
    }).catch(error => {console.log(error)})
};

export const postTokenNotification = async (token,tokenNotification) => {
    let details = {
      TokenNotification: tokenNotification,
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch("https://hcmusemu.herokuapp.com/account/tokennotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `bearer ${token}`,
      },
      body: formBody,
    }).then((response) => response.json())
      .then((json) => {

      }).catch((err) => console.log(err, "error"));
};

export const ForgetPassword = async (email) =>{
    let details = {
        emailApp: email,
        emailReset: email
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
            console.log(dataRes);
        }
    }).catch(error => console.log('error', error));
};
