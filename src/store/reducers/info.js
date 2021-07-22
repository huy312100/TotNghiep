const initialState = {
    name: null,
    image: null,
    email: null,
    uniID: null,
    uniName: null,
    facID: null,
    facName: null
}

const infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_INFO':
            return {
                ...state,
                name: action.payload.HoTen,
                image: action.payload.AnhSV
            }

        default:
            return state;
    }
}

export default infoReducer;