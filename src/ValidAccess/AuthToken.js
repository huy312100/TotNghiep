const checkTokenExpired = function() {
    var isExpired = false;
    const expired = localStorage.getItem('expired');
    var dateNow = new Date();

    if (expired < dateNow.getTime()-60000)
        isExpired = true;

    //console.log(isExpired)
    return isExpired;
}

export default checkTokenExpired;
