import React from 'react'
import { Link } from 'react-router-dom'
import App from '../../App';
import SignedInLinks from './SignedInLInks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import { link } from 'fs';


const Navbar = (props) => {
    const { auth, profile } = props;

    //if user is signed in show following components
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo left">AH Work</Link>
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)