const initialState = {
    open:false
}

const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'STORE_OPENSIDEBAR':
            return {
                ...state,
                open:action.payload
            }

        default:
            return state;
    }
}

export default sidebarReducer;