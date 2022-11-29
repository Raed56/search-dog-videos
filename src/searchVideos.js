import React, { useState } from "react";
import "./searchvideo.css";
import VideoComponent from "./VideoComponent";

function SearchVideos() {
    const [query, setQuery] = useState("");

    const [videos, setVideos] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        console.log("hereheehererer");
        fetch(
            `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAmLtGt_mZ3Pv-TWEeNxHdS-CEXJ-Ny6yc&part=snippet&type=video&q=dog+${query}`
        )
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                console.log(data.items);
                setVideos(data.items);
            });
    };

    /*useEffect(() => {
        async function fetchdogData() {
            const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAmLtGt_mZ3Pv-TWEeNxHdS-CEXJ-Ny6yc&part=snippet&type=video&q=dog+${query}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                console.log(data.results); //tests for videos
                setVideos(data.results.items);
                setsendRequest(false);
            } catch (err) {
                console.error(err);
            }
        }
        fetchdogData();
    }, [sendRequest]);*/

    return (
        <>
            <form className="form">
                <label className="label" htmlFor="query">
                    {" "}
                    Video Name
                </label>
                <input
                    className="input"
                    type="text"
                    name="query"
                    placeholder="Dog Videos"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="button" type="submit" onClick={handleClick}>
                    Search Video
                </button>
            </form>
            <div className="card-list">
                {videos.map((video) => (
                    <div className="card" key={video.id.videoId}>
                        <img
                            className="card--image"
                            src={`${video.snippet.thumbnails.medium.url}`}
                            alt={video.snippet.title + "thumbnail"}
                        />
                        <div className="card--content">
                            <h3 className="card--title">
                                {video.snippet.title}
                            </h3>
                            <p>
                                <small>
                                    Channel Name: {video.snippet.channelTitle}
                                </small>
                            </p>
                            <p className="card--desc">
                                Video Description: {video.snippet.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default SearchVideos;
//fix errors with api response - done
//fix src for card image - done
//use react router to call second VideoComponent for single video
//videoComponent has to display video, title, channel name for the single videos
//allow search in second video component
//implement infinite scorlling/pagination on home component for multiple videos
