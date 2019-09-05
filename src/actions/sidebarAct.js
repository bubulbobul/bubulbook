import { SHOW_SIDEBAR, HIDE_SIDEBAR } from "./types";

export const showOrHideSidebarAct = (tr) => dispatch => {
    const fs = false

    if (tr === true) {
        dispatch({
            type: SHOW_SIDEBAR,
            payload: tr
        });
    } else {
        dispatch({
            type: HIDE_SIDEBAR,
            payload: fs
        })
    }

};