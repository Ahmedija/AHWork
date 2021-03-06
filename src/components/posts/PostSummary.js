import React from 'react'
import moment from 'moment'

const PostSummary = ({ post }) => {
    return (
        <div className="card z-debth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <img src="https://firebasestorage.googleapis.com/v0/b/social-network-clone-c2fa4.appspot.com/o/q0ggBuovffg3Cs8osuEfguAG80r2?alt=media&token=d6d28f01-e451-4146-a0fb-716171eba6d6"></img>
                <p>Posted by {post.authorFirstName} {post.authorLastName} </p>
                <p className="grey-text">{moment(post.createdAt.toDate()).fromNow()}</p>
                <span className="card-title">{post.content}</span>

            </div>
        </div >
    )
}

export default PostSummary