import React from 'react'

const PostSummary = ({ post }) => {
    return (
        <div className="card z-debth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{post.content}</span>
                <p>Loerm ipsumi</p>
                <p className="grey-text">1st April, 9am</p>
            </div>
        </div>
    )
}

export default PostSummary