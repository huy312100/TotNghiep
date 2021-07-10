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