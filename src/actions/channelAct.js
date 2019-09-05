import {
    LOAD_CURRENT_CHANNEL
} from "./types"

export const loadCurrentChannel = (channel) => {
    return {
        type: LOAD_CURRENT_CHANNEL,
        payload: {
            currentChannel: channel
        }
    }
}