import React, { Fragment } from 'react'
import { connect } from "react-redux"
import { showOrHideSidebarAct } from "../actions/sidebarAct"
import { showPanelsbarAct } from "../actions/showPanelsAct";
import {
    Button,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
    Divider,
    Grid
} from 'semantic-ui-react'
// import Sidebar from "./sidebar/Sidebar"

import Background from "../assets/images/winter-260817_1920.jpg"
import ColorPanel from "./colorPanel/ColorPanel"
import LeftPanel from "./leftPanel/LeftPanel"
import Messages from "./messages/Messages"
import MetaPanel from "./metaPanel/MetaPanel"


var sectionStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${Background})`

};


const Dashboard = ({ showPanelsbarAct, showOrHideSidebarAct, sidebarVisible, currentUser }) => {

    const channelsPanel = "ChannelsPanel";
    const usersPanel = "UserPanel";
    const favoriteChannels = "FavoriteChannels";

    return (
        <Fragment>
            <Sidebar.Pushable as={Segment} style={{ marginTop: "0" }}>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    onHide={e => {
                        showOrHideSidebarAct()
                    }}
                    vertical
                    visible={sidebarVisible}
                    width='thin'
                    style={{ zIndex: "3" }}
                >
                    <Divider hidden />
                    <Divider hidden />
                    <Divider hidden />
                    <Menu.Item as='a'
                        onClick={e => {
                            showOrHideSidebarAct();
                            showPanelsbarAct(channelsPanel)
                        }}
                    >
                        <Icon name='discussions' />
                        Channels
                     </Menu.Item>
                    <Menu.Item as='a'
                        onClick={e => {
                            showOrHideSidebarAct()
                            showPanelsbarAct(usersPanel)
                        }}
                    >
                        <Icon name='users' />
                        Users
                    </Menu.Item>
                    <Menu.Item as='a'
                        onClick={e => {
                            showOrHideSidebarAct()
                            showPanelsbarAct(favoriteChannels)
                        }}
                    >
                        <Icon name='star' />
                        Favorites
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarVisible} >
                    {/* <section style={sectionStyle}> */}
                    <div style={{ width: "100%", height: "99vh" }}>
                        <Divider hidden style={{ marginTop: "0" }} />
                        <Divider hidden />
                        <Divider hidden />
                        <Divider hidden />

                        <Grid columns="equal" style={{ background: "#eee" }}>
                            <ColorPanel />

                            <Grid.Column >
                                <MetaPanel />
                            </Grid.Column>
                            <Grid.Column style={{ marginRight: "" }}>
                                <Messages />
                            </Grid.Column>

                            <LeftPanel currentUser={currentUser} />
                        </Grid>

                    </div>
                    {/* </section> */}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        sidebarVisible: state.sidebarVisible.sidebarVisible
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showOrHideSidebarAct: (tr) => {
            dispatch(showOrHideSidebarAct(tr));
        },
        showPanelsbarAct: (panelToShow) => {
            dispatch(showPanelsbarAct(panelToShow));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
