import { SHOW_SIDEBAR, HIDE_SIDEBAR } from "../actions/types"

const initialState = {
    sidebarVisible: false,
}

export default (state = initialState, action) => {

    switch (action.type) {
        case SHOW_SIDEBAR:
            return {
                ...state,
                sidebarVisible: action.payload,
            }
        case HIDE_SIDEBAR:
            return {
                ...state,
                sidebarVisible: action.payload,
            }
        default:
            return state
    }
}