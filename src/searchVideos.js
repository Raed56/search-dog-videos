import React, { useState } from "react";

function SearchVideos() {
    const [query, setQuery] = useState("");

    const [videos, setVideos] = useState([]);

    const searchVideos = async (e) => {
        e.preventDefault(); //prevent it from actually posting the data by default
        //console.log("submitting"); //test submit

        const url = `https://www.googleapis.com/youtube/v3/search?
        key=AIzaSyAmLtGt_mZ3Pv-TWEeNxHdS-CEXJ-Ny6yc&part=snippet&type=video&q=dog+${query}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            //console.log(data.results) //tests for videos
            setVideos(data.results);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form className="form" onSubmit={searchVideos}>
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
                <button className="button" type="submit">
                    Search Video
                </button>
            </form>
            <div className="card-list">
                {videos.map((video) => (
                    <div className="card" key={video.id}>
                        <img
                            className="card--image"
                            src={`https://www.pexels.com/search/dog/${video.thumbnail}`} //src is random placeholder for now
                            alt={video.title + "thumbnail"}
                        />
                        <div className="card--content">
                            <h3 className="card--title">{video.title}</h3>
                            <p>
                                <small>Channel: {video.channel}</small>
                            </p>
                            <p className="card--desc">
                                Description: {video.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default SearchVideos;
//fix errors with api response
//fix src for card image
