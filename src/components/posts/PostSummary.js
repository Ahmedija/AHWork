import React from 'react'
import moment from 'moment'

const PostSummary = ({ post }) => {
    return (
        <div className="card z-debth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{post.content}</span>
                <p>Posted by {post.authorFirstName} {post.authorLastName}</p>
                <p className="grey-text">{moment(post.createdAt.toDate()).fromNow()}</p>
            </div>
        </div>
    )
}

export default PostSummary