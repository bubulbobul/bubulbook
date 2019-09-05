import React, { useState, Fragment } from "react";
import { Menu, Container, Icon, Image, Button } from "semantic-ui-react";
import { connect } from "react-redux"
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/bubulBook2.png";
import { showOrHideSidebarAct } from "../../actions/sidebarAct";
import firebase from "firebase"

const AuthNavbar = ({ showOrHideSidebarAct, userName, photoUrl }) => {
    const [active, setActive] = useState({
        activeItem: ""
    });

    const handleItemClick = (e, { name }) => setActive({ activeItem: name });

    const handleLogout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log("signed out"))
    }

    const { activeItem } = active;
    const tr = true
    return (
        <Fragment>
            <Fragment>
                <Menu
                    size='small'
                    fixed='top' stackable pointing secondary color="blue" inverted
                    style={{ zIndex: "2" }}
                >
                    <Container>
                        <Menu.Item
                            onClick={(e) => {
                                showOrHideSidebarAct(tr)
                            }}
                            style={{ padding: "5px 0" }}
                        >
                            <Image src={Logo} size='small' />
                        </Menu.Item>

                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Image src={photoUrl} avatar />
                                {userName.toUpperCase()}
                            </Menu.Item>
                            <Menu.Item>
                                <Button
                                    floated='right'
                                    onClick={handleLogout}
                                    color='red'
                                    circular
                                    icon="sign-out" />
                            </Menu.Item>
                        </Menu.Menu>
                    </Container>
                </Menu>
            </Fragment>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        userName: state.user.currentUser.displayName,
        photoUrl: state.user.currentUser.photoURL,
        sidebarVisible: state.sidebarVisible.sidebarVisible
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showOrHideSidebarAct: (tr) => {
            dispatch(showOrHideSidebarAct(tr));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthNavbar)