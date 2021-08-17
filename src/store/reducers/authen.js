const initialState = {
    socket:null,
    email:null,
    role:null,
    fisrtsign:null
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

        case 'STORE_ROLE':{
            return {
                ...state,
                role:action.payload
            }
        }

        case 'FIRST_SIGN':{
            return {
                ...state,
                fisrtsign:action.payload
            }
        }

        default:
            return state;
    }
}

export default authenReducer;