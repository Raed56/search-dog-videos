import React from "react";

function SearchVideos() {
    const searchVideos = async (e) => {
        e.preventDefault(); //prevent it from actually posting the data by default
        console.log("submitting");

        const query = "golden retriever"; //hard coded for now

        const url = `https://www.googleapis.com/youtube/v3/search?
        key=AIzaSyAmLtGt_mZ3Pv-TWEeNxHdS-CEXJ-Ny6yc&part=snippet&type=video&q=dog+${query}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
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
            />
            <button className="button" type="submit">
                Search Video
            </button>
        </form>
    );
}

export default SearchVideos;
//fix errors with api response
