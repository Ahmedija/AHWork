import React from 'react'
import moment from 'moment'

const PostSummaryUser = ({ post }) => {
    return (
        <div className="card z-debth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <p>Posted by {post.authorFirstName} {post.authorLastName}</p>
                <p className="grey-text">{moment(post.createdAt.toDate()).fromNow()}</p>
                <span className="card-title">{post.content}</span>

            </div>
        </div>
    )
}

export default PostSummaryUser