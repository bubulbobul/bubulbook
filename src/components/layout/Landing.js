import React from 'react'

import Register from "../auth/Register"
import BubulSitting from "../../assets/images/bubulbobul-sitting.jpg"

var sectionStyle = {
    backgroundImage: `url(${BubulSitting})`,
    width: "100%",
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center"

};
const Landing = () => {

    return (
        <section style={sectionStyle}>
            <Register />
        </section>
    )
}

export default Landing
