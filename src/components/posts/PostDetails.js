import React from 'react'

const PostDetails = (props) => {
    const id = props.match.params.id;
    return (
        <div className="container section project-details">
            <div className="card z-debth-0">
                <div className="card-content">
                    <span className="card-title">Post title - {id}</span>
                    <p>Sleam alejkum ljudino ovo je post item</p>
                </div>

                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by Ahmedija</div>
                    <div>22. January, 12am</div>
                </div>
            </div>
        </div>
    )
}

export default PostDetails
