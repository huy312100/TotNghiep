const initialState = {
    socket:null,
    email:null
}

const authenReducer = (state=initialState,action) =>{
    switch(action.type){
        case 'STORE_EMAIL':
            return {
                ...state,
                email:action.email
            }

        case 'CONNECT_SOCKET':{
            return {
                ...state,
                socket:action.socket
            }
        }

        default:
            return state;
    }
}

export default authenReducer;