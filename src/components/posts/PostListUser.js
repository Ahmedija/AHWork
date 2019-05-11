import React from 'react'
import PostSummary from './PostSummary'
import { Link } from 'react-router-dom'

const PostListUser = ({ posts, }) => {
    return (
        <div className="project-list section">
            {posts && posts.map(post => {
                return (
                    <Link to={'/post/' + post.id + post.authorId} key={post.id} >
                        <PostSummary post={post} />
                    </Link>
                )
            })}
        </div>
    )
}

export default PostListUser