import React from "react";

function searchVideos() {
    return (
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
            />
            <button className="button" type="submit">
                Search Video
            </button>
        </form>
    );
}

export default searchVideos;
