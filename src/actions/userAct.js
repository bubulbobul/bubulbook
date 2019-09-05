import {
    LOAD_USER,
    CLEAR_USER
} from "./types"

export const loadUserAct = (user, history) => {
    if (user) {
        history.push("/dashboard");
    }
    return {
        type: LOAD_USER,
        payload: {
            currentUser: user
        }
    }
}

export const clearUser = () => {
    return {
        type: CLEAR_USER
    }
}