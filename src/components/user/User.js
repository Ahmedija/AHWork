import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import ImgUpload from '../ImageUpload/ProfileImage'
import firebase from 'firebase'
import storageRef from 'firebase'



const User = (props) => {
    const { profile, auth } = props;

    var storage = firebase.storage();


    // Create a reference to the file we want to download
    if (!auth.uid) return <Redirect to='/signin' />
    var uid = firebase.auth().currentUser.uid;
    var pathReference = storage.ref(uid)
    let photoUrl = ''

    // Get the download URL
    pathReference.getDownloadURL().then(function (url) {
        // Insert url into an <img> tag to "download"
        photoUrl = url
        console.log(photoUrl)
        document.getElementById('imagebox').src = photoUrl
    }).catch(function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/object-not-found':
                // File doesn't exist
                break;

            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

            case 'storage/canceled':
                // User canceled the upload
                break;



            case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
        }
    });




    if (!auth.uid) return <Redirect to='/signin' />
    return (


        <div>
            <div className="card aboutUserCard">
                <div className="card-image">
                    <img id='imagebox' src='' />
                </div>
                <div className="card-content">
                    <span className="card-title">{props.profile.firstName} {props.profile.lastName}</span>
                    <p>{props.profile.dateBirth}</p>
                    <p>{props.profile.country} {props.profile.city}</p>
                    <p>{props.profile.gender}</p>


                </div>
                <div className="card-action">
                    <a href="http://localhost:3000/profileImage">Upload profile image</a>

                </div>

            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {

        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(User)