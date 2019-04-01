import React from 'react'
import { Link } from 'react-router-dom'
import App from '../../App';
import SignedInLinks from './SignedInLInks'
import SignedOutLinks from './SignedOutLinks'


const Navbar = () => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo left">AH Work</Link>
                <SignedInLinks />
                <SignedOutLinks />
            </div>
        </nav>
    )
}

export default Navbar;