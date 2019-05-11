import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'
import CreatePost from '../posts/CreatePost'
import PostList from '../posts/PostList'
import PostSummary from '../posts/PostSummary'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'


class Profile extends Component {
    render() {
        const posts = this.props;
        return (
            <div className="blockContainer" >
                <tr>
                    <td>
                        <User />
                    </td>
                    <td className="postProfile">
                        <CreatePost />
                    </td>
                </tr>

                <div>
                    <PostList />
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => {

    return {
        posts: state.firestore.ordered.posts,
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'posts', orderBy: ['createdAt', 'desc'] },
    ])
)(Profile)


