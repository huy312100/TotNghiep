const checkTokenExpired = function() {
    var isExpired = false;
    const expired = localStorage.getItem('expired');
    // var decodedToken = jwt.decode(token, { complete: true });
    var dateNow = new Date();

    if (expired < dateNow.getTime()-60000)
        isExpired = true;

    console.log(isExpired)
    return isExpired;
}

export default checkTokenExpired;