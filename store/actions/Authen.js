
const LOGIN = 'LOGIN';

export const login = (username, password) => {
  return async loginAction => {

    let details = {
      username: username,
      password: password,
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch("https://hcmusemu.herokuapp.com/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    }).then((response)=>{
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes])=>{
      if(statusCode === 200){
        console.log(dataRes);
        loginAction({
          type: LOGIN,
          token: dataRes.token,
        })
      }
      else{
        let message = 'Thông tin không hợp lệ . Xin vui lòng thử lại';
        throw new Error(message);
      }
      //console.log(dataRes.token);
    }).done();
  }
};



