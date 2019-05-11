import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import firebase from 'firebase'
import Dashboard from '../dashboard/Dashboard';


class ProfileImage extends Component {

    state = {
        selectedFile: null
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }



    fileUploadHandler = () => {
        const fd = new FormData();
        const uid = firebase.auth().currentUser.uid;
        fd.append('image', this.state.selectedFile, uid);
        axios.post('https://us-central1-social-network-clone-c2fa4.cloudfunctions.net/uploadFIle', fd)
            .then(res => {
                console.log(res);
                console.log(uid);
                alert("Image uploaded")
            });

    }

    render() {

        return (
            <div className="profileImage">
                <input type="file" onChange={this.fileSelectedHandler} />
                <button type="submit" onClick={this.fileUploadHandler}>Upload</button>
            </div>
        );
    }
}


/*const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        selectedFile: null
    }
}*/

export default ProfileImage