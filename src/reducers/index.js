import { combineReducers } from "redux";

import user from "./userRed"
import channel from "./channelRed"
import sidebarVisible from "./sidebarRed"
import showPanel from "./showPanelsRed"

export default combineReducers({
    user,
    channel,
    sidebarVisible,
    showPanel
})

