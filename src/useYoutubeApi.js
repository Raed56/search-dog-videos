import { useEffect, useState } from "react";

function useYoutubeApi(query, numbeOfVideos) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setVideos([]);
    }, [query]);

    useEffect(() => {
        setLoading(true);
        setError(false);

        fetch(
            `https://www.googleapis.com/youtube/v3/search?maxResults=${numbeOfVideos}&key=AIzaSyAmLtGt_mZ3Pv-TWEeNxHdS-CEXJ-Ny6yc&part=snippet&type=video&q=dog+${query}`
        )
            .then((data) => data.json())
            .then((data) => {
                setVideos(data.items);
                setHasMore(data.items.length > 0);
                setLoading(false);
            })
            .catch((e) => {
                setError(true);
            });
    }, [query, numbeOfVideos]);

    return { loading, error, videos, hasMore };
}

export default useYoutubeApi;
