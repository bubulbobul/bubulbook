import { SHOW_CHANELS_PANEL, SHOW_USERS_PANEL, SHOW_FAVORITES_CHANNELS } from "./types";

export const showPanelsbarAct = (panelToShow) => dispatch => {
    const show = true;

    console.log("panelToShow", panelToShow)

    if (panelToShow === "ChannelsPanel") {
        dispatch({
            type: SHOW_CHANELS_PANEL,
            payload: show
        });
    } else if (panelToShow === "UserPanel") {
        dispatch({
            type: SHOW_USERS_PANEL,
            payload: show
        })
    } else if (panelToShow === "FavoriteChannels") {
        dispatch({
            type: SHOW_FAVORITES_CHANNELS,
            payload: show
        })
    }

};