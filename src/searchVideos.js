import React, { useRef, useState, useCallback, useEffect } from "react";
import "./searchvideo.css";
//import VideoComponent from "./VideoComponent";
import VideoCard from "./VideoCard";

function SearchVideos() {
    const [query, setQuery] = useState("");

    const [videos, setVideos] = useState([]);

    const [callApi, setCallApi] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        console.log("Hello inside useEffect with callApi: ", callApi);

        if (!callApi) {
            return;
        }

        console.log("Hello useEffect");

        fetch(
            `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAmLtGt_mZ3Pv-TWEeNxHdS-CEXJ-Ny6yc&part=snippet&type=video&q=dog+${query}`
        )
            .then((data) => data.json())
            .then((data) => {
                console.log("New data: ", data);
                //console.log(data);
                //console.log(data.items);
                // setVideos(data.items);
            })
            .catch((e) => {
                console.log("Error", e);
            });
    }, [callApi]);

    const observer = useRef();

    const lastVideoElement = useCallback(
        (videoNode) => {
            console.log("Hello");

            if (observer.current) {
                observer.current.disconnect();
            }

            console.log("Hello after disconnect");

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    console.log("Hello setApiTrue");
                    setCallApi(true);
                }
            });

            if (videoNode) {
                console.log("Hello observe");
                observer.current.observe(videoNode);
            }
        },
        [hasMore]
    );

    const handleClick = (e) => {
        e.preventDefault();
        //console.log("hereheehererer");
        fetch(
            `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAmLtGt_mZ3Pv-TWEeNxHdS-CEXJ-Ny6yc&part=snippet&type=video&q=dog+${query}`
        )
            .then((data) => data.json())
            .then((data) => {
                //console.log(data);
                //console.log(data.items);
                setVideos(data.items);
                setHasMore(true);
            })
            .catch((e) => {
                console.log(e);
            });
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
            <div className="card-list">
                {videos.map((video, index) => {
                    if (videos.length === index + 1) {
                        <div ref={lastVideoElement} key={video.id.videoId}>
                            <VideoCard video={video} />
                        </div>;
                    }
                    return (
                        <div key={video.id.videoId}>
                            <VideoCard video={video} />
                        </div>
                    );
                })}
            </div>
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
