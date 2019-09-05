import React, { Fragment, useState, useEffect } from 'react'
import {
    Button,
    Icon,
    Menu,
    Modal,
    Divider,
    Grid,
    Popup,
    Segment
} from 'semantic-ui-react'
import firebase from "firebase"
import { useAlert } from 'react-alert'

const ChannelsPanel = ({ currentUser, loadCurrentChannel }) => {
    const alert = useAlert()
    const [channels, setChannels] = useState(null)
    const [modaleOC, setModalOC] = useState(false)
    const [activeChannel, setActiveChannel] = useState({
        isActiveId: ""
    })
    const { isActiveId } = activeChannel

    // Creating in firebase datbase the collection of Channels
    const [channelsRf] = useState({
        channelsRef: firebase.database().ref('channels')
    })

    const { channelsRef } = channelsRf

    const [formData, setFormData] = useState({
        channelName: "",
        channelDescription: ""
    })
    const { channelName, channelDescription } = formData

    useEffect(() => {
        addChannelListeners();
        removeChannelListeners()
    }, [])


    const deleteChannelById = (id) => {
        channelsRef.child(id).remove().then(() => {
            removeChannelListeners()
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const removeChannelListeners = () => {
        channelsRef.on('child_removed', snap => {
            alert.success(` Your ${snap.val().name} channel is successfully deleted!`)
            addChannelListeners();
        })
    }

    const addChannelListeners = () => {
        let loadedChannels = [];

        channelsRef.on('child_added', snap => {
            loadedChannels.unshift(snap.val());
            setChannels({ channels: loadedChannels })
        })
    }

    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e, channelName, channelDescription) => {
        e.preventDefault();
        if (isFormEmpty(channelName, channelDescription)) {
            addChannel(channelName, channelDescription)
        }
    };

    const isFormEmpty = (channelName, channelDescription) => {
        if (channelName === "" && channelDescription === "") {
            alert.error("Please fill the form to create a channel")
            return false
        } else if (channelName === "") {
            alert.error("Enter the channel name")
            return false
        } else if (channelDescription === "") {
            alert.error("Enter the channel description")
            return false
        } else return true
    }

    const addChannel = (channelName, channelDescription) => {
        const key = channelsRef.push().key;

        const newChannel = {
            key: key,
            name: channelName,
            description: channelDescription,
            createdBy: {
                name: currentUser.displayName,
                avatar: currentUser.photoURL,
                id: currentUser.uid
            }
        }

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                setFormData({
                    channelName: "",
                    channelDescription: ""
                });
                setModalOC(false);
                alert.success(`Your ${channelName} channel is successfully added`)
            }).catch(err => {
                console.error(err)
            })
    }

    const changeChannel = (channel) => {
        setActiveChannelFct(channel)
        loadCurrentChannel(channel)
    }

    const setActiveChannelFct = (channel) => {
        setActiveChannel({ isActiveId: channel.key })
    }

    // console.log(activeChannel)
    const displayChannels = channels => {
        return channels.channels.length > 0 && channels.channels.map(channel => (
            <Menu.Item
                key={channel.key}
                onClick={() => changeChannel(channel)}
                name={channel.name}
                style={{
                    color: "rgba(0,0,0,.87)"
                }}
                active={channel.key === isActiveId}
            >
                #{channel.name}{" "}
                <Fragment>
                    {
                        currentUser.uid === channel.createdBy.id && (
                            <Icon name="remove" onClick={() => deleteChannelById(channel.key)} />
                        )
                    }
                </Fragment>

            </Menu.Item>
        ))
    }

    return (
        <Fragment>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            {/* <Segment style={{ maxHeight: "50vh" }}> */}
            <Segment style={{ overflow: 'auto', maxHeight: "50vh" }}>
                <Grid style={{
                    // background: "#233237",
                    background: "#e2c08d",
                    // background: "white",
                    // width: "20vw"
                }}>
                    <Grid.Column style={{ padding: "2vw" }}>
                        <Menu.Menu style={{ paddingBottom: "2em" }}>
                            <Menu.Item style={{ color: "rgba(0,0,0,.87)" }}>
                                <span><strong><Icon name="exchange" /> CHANNELS</strong>
                                    {" "} (<Fragment>
                                        {channels === null ?
                                            <Fragment>
                                                0
                                    </Fragment> : <Fragment>
                                                {channels.channels.length}
                                            </Fragment>}
                                    </Fragment>)
                            </span>
                                <Popup basic content='Add a new channel group'
                                    trigger={<Icon
                                        onClick={e => setModalOC(true)}
                                        name="add" floated="right"
                                        style={{ cursor: "pointer" }}
                                    />}
                                />
                            </Menu.Item>
                            {/* Display Channels */}
                            <Fragment>
                                {
                                    channels !== null && (
                                        <Fragment>
                                            {displayChannels(channels)}
                                        </Fragment>
                                    )
                                }
                            </Fragment>
                        </Menu.Menu>

                        {/* Add Channel Modal */}
                        <Modal basic
                            open={modaleOC}
                            onClose={e => setModalOC(false)}
                        >
                            <Modal.Header>Add a Channel</Modal.Header>
                            <Modal.Content>
                                <form className="ui form">
                                    <div className="field">
                                        <div className="ui left icon input">
                                            <input
                                                placeholder="Name of Channel - Which channel would you like to create ?"
                                                name="channelName"
                                                label="Name of Channel"
                                                required
                                                type="text"
                                                value={channelName}
                                                onChange={e => handleChange(e)}
                                                style={{ borderRadius: "50px" }}
                                            />
                                            <i aria-hidden="true" className="discussions icon"></i>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui left icon input">
                                            <input
                                                placeholder="About the Channel - Describe your channel"
                                                name="channelDescription"
                                                required
                                                type="text"
                                                value={channelDescription}
                                                onChange={e => handleChange(e)}
                                                style={{ borderRadius: "50px" }}
                                            />
                                            <i aria-hidden="true" className="align justify icon"></i>
                                        </div>
                                    </div>
                                </form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={e => handleSubmit(e, channelName, channelDescription)} style={{ borderRadius: "50px" }} color="green" inverted>
                                    <Icon name="checkmark" /> Add
                            </Button>
                                <Button onClick={e => setModalOC(false)} style={{ borderRadius: "50px" }} color="red" inverted>
                                    <Icon name="remove" /> Cancel
                            </Button>
                            </Modal.Actions>
                        </Modal>
                    </Grid.Column>

                </Grid>
            </Segment>
        </Fragment>
    )
}

export default ChannelsPanel
