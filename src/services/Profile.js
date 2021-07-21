

//upload image api
export const uploadImage = async ( token,image ) =>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var formdata = new FormData();

    if(image.uri !== ""){
        let localUri = image.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formdata.append("image", {uri:localUri,name:filename,type});
    }
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/profile/uploadimgparent",requestOptions)
    .then((response) => {
      const statusCode = response.status;
      const dataRes = response.json();
      return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes]) => {
      if(statusCode === 200){
        console.log(dataRes);
        //editProfile();
      }
      else{
        console.log("loi");
      }

      //console.log(dataUniversity);
    }).catch((err) => console.log(err, "error"));
};

export const deleteImage = async (token) =>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/profile/deleteimgparent", requestOptions)
    .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then((statusCode,dataRes) => {
        console.log(statusCode, dataRes);
        if(statusCode === 200 ) {

        }
    }).catch(error => console.log('error', error));
};

export const editProfile = async (token,fullname) => {
    let details = {
      HoTen: fullname, 
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch("https://hcmusemu.herokuapp.com/profile/editparent", {
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
        console.log(dataRes);
        if(statusCode === 200){
            console.log(dataRes);
        }
      }).catch((err)=> console.log(err, "error"));
};