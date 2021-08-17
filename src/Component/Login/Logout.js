import React, { Component, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Logout() {
    const history = useHistory();

    useEffect(() => {
        localStorage.clear();
        history.replace("/");
        console.log(localStorage.getItem("token"))
    }, [])

    return null
}

export default Logout;