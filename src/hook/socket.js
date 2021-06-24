import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import Login from '../Component/Login/Login';
import Student from '../Component/Mainpage/Student/Student';
import { connectSocket } from '../store/actions/authen';

function ConnectSocket() {

    console.log(1)
    const dispatch = useDispatch();

    useEffect(() => {
        checkTokenExpired();
    }, [])


    const getInfo = async () => {
        var myHeaders = new Headers();

        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        // var urlencoded = new URLSearchParams();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/profile/view", requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json()
                throw Error("Token Expired")
            })
            .then(result => {
                console.log("ok")
                var socket = io("https://hcmusemu.herokuapp.com", { transports: ['websocket'] });
                socket.emit("Start", localStorage.getItem("token"));

                console.log("Connect socket");

                const action = connectSocket(socket)
                dispatch(action);
            })
            .catch(error => {
                console.log('error', error)
                localStorage.removeItem("token");
            });
    }

    const checkTokenExpired = async () => {
        await getInfo()
    }


    // checkTokenExpired()
    return null;
}

export default ConnectSocket;