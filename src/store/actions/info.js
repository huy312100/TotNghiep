export const storedInfo = (info) => {
    return {
        type: 'STORE_INFO',
        payload:info
    }
}

export const storedMoodle = (md) => {
    return {
        type: 'STORE_MOODLE',
        payload:md
    }
}