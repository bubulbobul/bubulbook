import React, { useState, Fragment } from "react";
import { Transition as TransitionSpring, animated } from 'react-spring/renderprops';
import { Button, Segment, Header, Icon, Container } from "semantic-ui-react";
import firebase from "../../firebase"
import md5 from 'md5'
import { useAlert } from 'react-alert'

const Register = () => {
    const alert = useAlert()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        country: "",
    });
    const [formVisible, toggleFormVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // Creating in firebase datbase the collection of Users
    const [users] = useState({
        usersRef: firebase.database().ref('users')
    })
    const { name, email, country, password, passwordConfirmation } = formData;

    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        if (isPasswordValid(password, passwordConfirmation)) {
            setLoading(true)
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(createdUser => {
                    // console.log(createdUser)
                    createdUser.user.updateProfile({
                        displayName: name,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    }).then(() => {
                        savedUser(createdUser).then(() => {
                            // console.log("user saved")
                            setLoading(false)
                        })
                    }).catch(err => {
                        console.error(err)
                        alert.error(`${err.message}`)
                        setLoading(false)
                    })
                    setLoading(true)
                })
                .catch(err => {
                    console.error(err)
                    setLoading(false)
                    alert.error(`${err.message}`)

                })
        }

    };

    const savedUser = createdUser => {
        return users.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
            createdAt: createdUser.user.metadata.creationTime,
            lastSignInTime: createdUser.user.metadata.lastSignInTime,
            country: country
        })
    }

    const isPasswordValid = (pwd, pwdc) => {
        if (pwd.length < 6 || pwdc.length < 6) {
            alert.error("Password should be at least 6 characters")
            return false;
        } else if (pwd !== pwdc) {
            alert.error("Password do not match")
            return false;
        } else {
            return true
        }
    };

    return (
        <Fragment>
            <Fragment>
                <TransitionSpring
                    native
                    items={true}
                    from={{ opacity: 0 }}
                    enter={{ opacity: 1 }}
                    leave={{ opacity: 0 }}
                    config={{ delay: 1000 }}
                >
                    {
                        show => show && (props => (
                            <animated.div style={props}>
                                <Segment
                                    raised floated="right"
                                    style={{
                                        marginRight: "10vw",
                                        marginTop: "10vh",
                                        background: "none",
                                        border: "none",
                                        width: "250px",
                                        borderRadius: "50px"
                                    }}
                                >
                                    <Segment style={{ borderRadius: "50px" }}
                                        onClick={() =>
                                            toggleFormVisible(!formVisible)
                                        }>
                                        <Header as='h3'>
                                            {formVisible ? (
                                                <Icon name='arrow alternate circle up' />
                                            ) : (
                                                    <Icon name='arrow alternate circle down' />
                                                )}
                                            <Header.Content>Register</Header.Content>
                                        </Header>
                                    </Segment>
                                    <TransitionSpring
                                        native
                                        items={formVisible}
                                        from={{ opacity: 0 }}
                                        enter={{ opacity: 1 }}
                                        leave={{ opacity: 0 }}
                                        config={{ delay: 1000 }}
                                    >
                                        {
                                            show => show && (props => (
                                                <animated.div style={props}>
                                                    <Container textAlign="center">
                                                        <form className="ui small form" onSubmit={e => handleSubmit(e)}>
                                                            <div className="ui left icon input">
                                                                <input
                                                                    placeholder="Name"
                                                                    name="name"
                                                                    required
                                                                    type="text"
                                                                    value={name}
                                                                    onChange={e => handleChange(e)}
                                                                    style={{ borderRadius: "50px" }}
                                                                />
                                                                <i aria-hidden="true" className="user icon"></i>
                                                            </div>
                                                            <br />
                                                            <br />
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
                                                                <i aria-hidden="true" className="mail icon"></i>
                                                            </div>
                                                            <br />
                                                            <br />
                                                            <div className="ui left icon input">
                                                                <input
                                                                    placeholder="Country"
                                                                    name="country"
                                                                    required
                                                                    type="text"
                                                                    value={country}
                                                                    onChange={e => handleChange(e)}
                                                                    style={{ borderRadius: "50px" }}
                                                                />
                                                                <i aria-hidden="true" className="globe icon"></i>
                                                            </div>
                                                            <br />
                                                            <br />
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
                                                            <br />
                                                            <br />
                                                            <div className="ui left icon input">
                                                                <input
                                                                    placeholder="Password Confirmation"
                                                                    name='passwordConfirmation'
                                                                    required
                                                                    type="password"
                                                                    value={passwordConfirmation}
                                                                    onChange={e => handleChange(e)}
                                                                    style={{ borderRadius: "50px" }}
                                                                />
                                                                <i aria-hidden="true" className="redo icon"></i>
                                                            </div>
                                                            <br />
                                                            <br />
                                                            <Container textAlign="center">
                                                                <Button
                                                                    disabled={loading}
                                                                    className={loading ? 'loading' : ''}
                                                                    content='Register'
                                                                    secondary style={{ borderRadius: "50px" }}
                                                                />
                                                            </Container>

                                                        </form>
                                                    </Container>
                                                </animated.div>
                                            ))
                                        }
                                    </TransitionSpring>
                                </Segment>

                            </animated.div>
                        ))
                    }
                </TransitionSpring>
            </Fragment>
        </Fragment>

    );
};

export default Register;