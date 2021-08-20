import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { connectSocket } from '../store/actions/authen';

function ConnectSocket() {

    // console.log(1)
    const dispatch = useDispatch();

    useEffect(() => {
        var socket = io("https://hcmusemu.herokuapp.com", { transports: ['websocket'] });
        socket.emit("Start", localStorage.getItem("token"));

        console.log("Connect socket");

        const action = connectSocket(socket)
        dispatch(action);
    }, [])
    
    return null;
}

export default ConnectSocket;