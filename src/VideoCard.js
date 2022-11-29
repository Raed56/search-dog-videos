import React from "react";
import "./videocard.css";

function VideoCard({ video }) {
    return (
        <div className="card">
            <img
                className="card--image"
                src={`${video.snippet.thumbnails.medium.url}`}
                alt={video.snippet.title + "thumbnail"}
            />
            <div className="card--content">
                <h3 className="card--title">{video.snippet.title}</h3>
                <p>
                    <small>Channel Name: {video.snippet.channelTitle}</small>
                </p>
                <p className="card--desc">
                    Video Description: {video.snippet.description}
                </p>
            </div>
        </div>
    );
}

export default VideoCard;
