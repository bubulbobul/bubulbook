import React, { Fragment } from 'react'
import { connect } from "react-redux"
import { Transition as TransitionSpring, animated } from 'react-spring/renderprops';
import { loadCurrentChannel } from "../../actions/channelAct"
import { Menu } from 'semantic-ui-react'
import ChannelsPanel from "./ChannelsPanel"
import UserPanel from "./UserPanel"
import FavoritesChannels from "./FavoritesChannels"

const LeftPanel = ({
    currentUser,
    showChannelsPanel,
    showUsersPanel,
    showFavoritesChannels,
    loadCurrentChannel }) => {
    return (
        <Fragment>
            <Menu
                // size="large"
                inverted
                fixed="right"
                vertical
                style={{
                    background: "#eee",
                    width: "20vw",
                    borderLeft: "2px solid #dbdbdb"
                }}
            >
                <Fragment>
                    <TransitionSpring
                        native
                        items={showChannelsPanel}
                        from={{ opacity: 0 }}
                        enter={{ opacity: 1 }}
                        leave={{ opacity: 0 }}
                        config={{ delay: 0 }}
                    >
                        {
                            show => show && (props => (
                                <animated.div style={props}>
                                    <ChannelsPanel
                                        currentUser={currentUser}
                                        loadCurrentChannel={loadCurrentChannel}
                                    />
                                </animated.div>))}
                    </TransitionSpring>
                </Fragment>
                <Fragment>
                    <TransitionSpring
                        native
                        items={showUsersPanel}
                        from={{ opacity: 0 }}
                        enter={{ opacity: 1 }}
                        leave={{ opacity: 0 }}
                        config={{ delay: 1000 }}
                    >
                        {
                            show => show && (props => (
                                <animated.div style={props}>
                                    <UserPanel />
                                </animated.div>))}
                    </TransitionSpring>
                </Fragment>
                <Fragment>
                    <TransitionSpring
                        native
                        items={showFavoritesChannels}
                        from={{ opacity: 0 }}
                        enter={{ opacity: 1 }}
                        leave={{ opacity: 0 }}
                        config={{ delay: 2000 }}
                    >
                        {
                            show => show && (props => (
                                <animated.div style={props}>
                                    <FavoritesChannels />
                                </animated.div>))}
                    </TransitionSpring>
                </Fragment>
            </Menu>

            <Fragment>

            </Fragment>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        showChannelsPanel: state.showPanel.chanelsPanel,
        showUsersPanel: state.showPanel.usersPanel,
        showFavoritesChannels: state.showPanel.favoritesChannels
    }
}

export default connect(mapStateToProps, { loadCurrentChannel })(LeftPanel);
