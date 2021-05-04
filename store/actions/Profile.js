export const CONNECT_APPLICATION = 'CONNECT_APPLICATION';


export const connectApplication = (typeUrl,url,username,password) =>{
    return async (dispatch,getState) =>{
        const token = getState().authen.token;
        //console.log(token);
        let details = {
            typeUrl: typeUrl,
            url:url,
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

          await fetch("https://hcmusemu.herokuapp.com/web/postaccountcustom", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `bearer ${token}`
            },
            body: formBody,
        }).then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes])=>{
            console.log(dataRes,statusCode); 
            dispatch({
                type: CONNECT_APPLICATION,
            })
        }).catch(error => console.log('error', error));
    }
}