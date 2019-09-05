import { LOAD_USER, CLEAR_USER } from "../actions/types"

const initialUserState = {
    currentUser: null,
    isLoading: true
}

export default (state = initialUserState, action) => {

    switch (action.type) {
        case LOAD_USER:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                isLoading: false,
            }
        case CLEAR_USER:
            return {
                ...state,
                currentUser: null,
                isLoading: false
            }
        default:
            return state
    }
}