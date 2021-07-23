
export const SignOut = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/account/signout", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

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

export const ForgetPassword = async (email) =>{
    let details = {
        email: email,
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