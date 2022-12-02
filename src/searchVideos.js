import React, { useRef, useState, useCallback, useEffect } from "react";
import "./searchvideo.css";
//import VideoComponent from "./VideoComponent";
import VideoCard from "./VideoCard";
import useYoutubeApi from "./useYoutubeApi";

function SearchVideos() {
    const [query, setQuery] = useState("");
    const [numberOfVideos, setNumberOfVideos] = useState(5);
    const [clickedSearch, setClickedSearch] = useState(false);

    const { videos, hasMore, loading, error } = useYoutubeApi(
        query,
        numberOfVideos
    );

    const observer = useRef();

    const lastVideoElement = useCallback(
        (videoNode) => {
            if (loading) {
                return;
            }

            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    //   console.log("Hello setApiTrue");
                    setNumberOfVideos((prev) => prev + 6);
                }
            });

            if (videoNode) {
                // console.log("Hello observe");
                observer.current.observe(videoNode);
            }
        },
        [loading, hasMore]
    );

    const handleClick = (e) => {
        e.preventDefault();
        if (!clickedSearch) {
            setClickedSearch(true);
        }
    };

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
            {clickedSearch && (
                <div className="card-list">
                    {videos.map((video, index) => {
                        if (videos.length === index + 1) {
                            return (
                                <div
                                    ref={lastVideoElement}
                                    key={video.id.videoId}
                                    className="lastElement"
                                >
                                    <VideoCard video={video} />
                                </div>
                            );
                        } else {
                            return (
                                <div key={video.id.videoId}>
                                    <VideoCard video={video} />
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </>
    );
}

export default SearchVideos;
//fix errors with api response - done
//fix src for card image - done
//add styling to carda and components
//use react router to call second VideoComponent for single video
//videoComponent has to display video, title, channel name for the single videos
//allow search in second video component
//implement infinite scorlling/pagination on home component for multiple videos
