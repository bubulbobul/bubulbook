import React, { Fragment } from "react";
import GuestNavbar from "./GuestNavbar";
import AuthNavbar from "./AuthNavbar";

const Navbar = ({ userLoggedIn }) => {

    return (
        <Fragment>
            {
                userLoggedIn === false ? <GuestNavbar /> : <AuthNavbar />
            }

        </Fragment>
    );
};

export default Navbar