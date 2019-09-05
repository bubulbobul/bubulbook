import { LOAD_CURRENT_CHANNEL } from "../actions/types"

const initialChannelState = {
    currentChannel: null,
    isLoading: true
}

export default (state = initialChannelState, action) => {

    switch (action.type) {
        case LOAD_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.payload.currentChannel,
                isLoading: false,
            }
        default:
            return state
    }
}