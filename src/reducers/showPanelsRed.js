import { SHOW_CHANELS_PANEL, SHOW_USERS_PANEL, SHOW_FAVORITES_CHANNELS } from "../actions/types"

const initialState = {
    chanelsPanel: true,
    usersPanel: false,
    favoritesChannels: false
}

export default (state = initialState, action) => {
    // console.log(state.sidebarVisible)
    // console.log(action.payload)

    switch (action.type) {
        case SHOW_CHANELS_PANEL:
            return {
                ...state,
                chanelsPanel: action.payload,
                usersPanel: false,
                favoritesChannels: false
            }
        case SHOW_USERS_PANEL:
            return {
                ...state,
                chanelsPanel: false,
                usersPanel: action.payload,
                favoritesChannels: false
            }
        case SHOW_FAVORITES_CHANNELS:
            return {
                ...state,
                chanelsPanel: false,
                usersPanel: false,
                favoritesChannels: action.payload,
            }
        default:
            return state
    }
}