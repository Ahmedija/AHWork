import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import axios from 'axios'

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        dateBirth: '',
        country: '',
        city: '',
        selectedFile: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
    }


    fileChangedHandler = event => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    uploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('https://us-central1-social-network-clone-c2fa4.cloudfunctions.net/uploadFIle', fd)
            .then(res => {
                console.log(res);
            })
    }


    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/' />

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange} />
                    </div>


                    <div className="input-field">

                        <form onChange={this.handleChange}>
                            <p>
                                <label>
                                    <input type="checkbox" id="gender" value="Male" />
                                    <span>Male</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" id="gender" value="Female" />
                                    <span>Female</span>
                                </label>
                            </p>

                        </form>
                        <label htmlFor="gender">Gender</label>
                        <input type="" id="gender" onChange={this.handleChange} />
                    </div>


                    <div className="input-field">
                        <label htmlFor="dateBirth">Date of Birth</label>
                        <input type="date" id="dateBirth" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="country">Country</label>
                        <input type="text" id="country" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <button className="btn green lighten-1 z-debth-0">SignUp</button>
                    </div>
                    <div className="red-text center">
                        {authError ? <p>{authError}</p> : null}
                    </div>

                </form>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
