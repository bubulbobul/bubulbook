import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import firebase from "../../firebase"
import { useAlert } from 'react-alert'

import { Menu, Image, Container, Button, Message, Header } from "semantic-ui-react";
import Logo from "../../assets/images/bubulBook2.png";

const GuestNavbar = () => {
    const alert = useAlert()
    const [active, setActive] = useState({
        activeItem: ""
    });

    const handleItemClick = (e, { name }) => setActive({ activeItem: name });
    const { activeItem } = active;
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const { email, password } = formData;

    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e, email, password) => {
        e.preventDefault();
        if (isFormValid(email, password)) {
            setLoading(true);
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(signedInUser => {
                    console.log(signedInUser)
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    alert.error(`${err.message}`)
                    setLoading(false)
                })
        }
    };

    const isFormValid = (email, password) => {
        if (email === "" || password === "") {
            alert.error("Please fill the fields name and password to login")
            return false
        } else return true
    }

    return (
        <React.Fragment>
            <Menu size='small'
                fixed='top' stackable pointing secondary color="blue" inverted
                style={{ zIndex: "2" }}
            >
                <Container>
                    <Menu.Item
                        as={NavLink}
                        to='/'
                        name='welcome'
                        active={activeItem === "welcome"}
                        onClick={handleItemClick}
                        style={{ padding: "5px 0" }}
                    >
                        <Image src={Logo} size='small' />
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <div className="ui left icon input">
                                <input
                                    placeholder="Email"
                                    name="email"
                                    required
                                    type="text"
                                    value={email}
                                    onChange={e => handleChange(e)}
                                    style={{ borderRadius: "50px" }}
                                />
                                <i aria-hidden="true" className="at icon"></i>
                            </div>
                        </Menu.Item>
                        <Menu.Item>
                            <div className="ui left icon input">
                                <input
                                    placeholder="Password"
                                    name="password"
                                    required
                                    type="password"
                                    value={password}
                                    onChange={e => handleChange(e)}
                                    style={{ borderRadius: "50px" }}
                                />
                                <i aria-hidden="true" className="lock icon"></i>
                            </div>
                        </Menu.Item>
                        <Menu.Item>
                            <Button
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                                content='Login'
                                secondary
                                floated="left"
                                style={{ borderRadius: "50px" }}
                                onClick={e => handleSubmit(e, formData.email, formData.password)}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        </React.Fragment>
    );
};
export default GuestNavbar;