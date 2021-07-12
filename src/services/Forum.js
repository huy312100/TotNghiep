export const getForum = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/forum/view", requestOptions)
    .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes]) => {
        if(statusCode === 200){
            return dataRes;
        }
    }).catch(error => console.log('error', error));
};

export const createPost = async (token,title,image,scope)=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var convertScope ;

    if(scope === 'Trường'){
        convertScope = 'u'
    }
    
    if(scope === 'Khoa'){
        convertScope = 'f'
    }

    var formdata = new FormData();
    
    if(image.uri !=="" && image.uri !== null){
        let localUri = image.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        formdata.append("title", title);
        formdata.append("image", {uri:localUri,name:filename,type});
        formdata.append("scope", convertScope);
    }

    else{
        formdata.append("title", title);
        formdata.append("scope", convertScope);
    }
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

    await fetch("https://hcmusemu.herokuapp.com/forum/post",requestOptions)
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


export const deletePost = async(token,idPost) => {
    let details = {
        IDPost: idPost,
    };
  
    let formBody = [];

    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://hcmusemu.herokuapp.com/forum/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `bearer ${token}`,
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

export const likePost = async (token,idPost) =>{
    let details = {
        IDPost: idPost,
    };
  
    let formBody = [];

    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch("https://hcmusemu.herokuapp.com/forum/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `bearer ${token}`,
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

export const unlikePost = async (token,idPost) =>{
    let details = {
        IDPost: idPost,
    };
  
    let formBody = [];

    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch("https://hcmusemu.herokuapp.com/forum/unlike", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `bearer ${token}`,
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

export const deleteCmt = async (token,idCmt) =>{
    let details = {
        IDCmt: idCmt,
    };
  
    let formBody = [];

    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://hcmusemu.herokuapp.com/forum/deletecmt", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `bearer ${token}`,
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

export const commentPost = async (token,idPost,comment,image ) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var formdata = new FormData();
    
    if(image.uri !==""){
        let localUri = image.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        formdata.append("IDPost", idPost);
        formdata.append("comment", comment);
        formdata.append("image", {uri:localUri,name:filename,type});
    }

    else{
        formdata.append("IDPost", idPost);
        formdata.append("comment", comment);
       
    }
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

    await fetch("https://hcmusemu.herokuapp.com/forum/cmt",requestOptions)
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



//course services
export const createCoursePost = async (token,IDCourses,title,image)=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var formdata = new FormData();
    
    if(image.uri !=="" && image.uri !== null){
        let localUri = image.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        formdata.append("IDCourses", IDCourses);
        formdata.append("title", title);
        formdata.append("image", {uri:localUri,name:filename,type});
    }

    else{
        formdata.append("IDCourses", IDCourses);
        formdata.append("title", title);
    }
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

    await fetch("https://hcmusemu.herokuapp.com/forum/courses/post",requestOptions)
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

export const deleteCoursePost = async(token,idPost) => {
    let details = {
        IDPost: idPost,
    };
  
    let formBody = [];

    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://hcmusemu.herokuapp.com/forum/courses/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `bearer ${token}`,
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

export const commentCoursePost = async (token,idPost,comment,image ) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var formdata = new FormData();
    
    if(image.uri !==""){
        let localUri = image.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        formdata.append("IDPost", idPost);
        formdata.append("comment", comment);
        formdata.append("image", {uri:localUri,name:filename,type});
    }

    else{
        formdata.append("IDPost", idPost);
        formdata.append("comment", comment);
       
    }
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

    await fetch("https://hcmusemu.herokuapp.com/forum/cmt",requestOptions)
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

export const deleteCourseCmt = async(token,idCmt) => {
    let details = {
        IDCmt: idCmt,
    };
  
    let formBody = [];

    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://hcmusemu.herokuapp.com/forum/deletecmt", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `bearer ${token}`,
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

export const likeCoursePost = async (token,idPost) =>{
    let details = {
        IDPost: idPost,
    };
  
    let formBody = [];

    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://hcmusemu.herokuapp.com/forum/courses/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `bearer ${token}`,
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

// export const unlikeCoursePost = async (token,idPost) =>{
//     let details = {
//         IDPost: idPost,
//     };
  
//     let formBody = [];

//     for (let property in details) {
//         let encodedKey = encodeURIComponent(property);
//         let encodedValue = encodeURIComponent(details[property]);
//         formBody.push(encodedKey + "=" + encodedValue);
//     }
//     formBody = formBody.join("&");

//     fetch("https://hcmusemu.herokuapp.com/forum/courses/like", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           "Authorization": `bearer ${token}`,
//         },
//         body: formBody,
//     }) .then((response) => {
//         const statusCode = response.status;
//         const dataRes = response.json();
//         return Promise.all([statusCode, dataRes]);
//     }).then(([statusCode, dataRes]) => {
//         console.log(statusCode,dataRes);
//         if(statusCode === 200){
//             console.log(dataRes);
//         }
//     }).catch(error => console.log('error', error));
// };

