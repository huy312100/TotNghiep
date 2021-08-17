export const connectSocket = (io) => {
    return {
        type: 'CONNECT_SOCKET',
        socket:io
    }
}

export const StoreEmail = (e) => {
    return {
        type: 'STORE_EMAIL',
        email:e
    }
}

export const StoreRole = (value) => {
    return {
        type: 'STORE_ROLE',
        payload:value
    }
}

export const FirstSign = (value) => {
    return {
        type: 'FIRST_SIGN',
        payload:value
    }
}