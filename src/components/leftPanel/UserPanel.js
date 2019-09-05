import React, { Fragment } from 'react'
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

const UserPanel = () => {
    return (
        <Fragment>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Grid style={{
                background: "#eee",
                // background: "white",
                // width: "20vw"
            }}>
                <Grid.Row style={{ padding: "2vw" }}>
                    UserPanel
                </Grid.Row>

            </Grid>
        </Fragment>
    )
}

export default UserPanel
