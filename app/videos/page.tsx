"use client";

import useVideos from "@/lib/hooks/useVideos";

const Videos = (): React.JSX.Element => {
    const videos = useVideos();

    if (videos.isLoading) {
        //@TODO: Add a better loading state
        return <div>Loading...</div>;
    }

    if (videos.hasError) {
        //@TODO: Add a better error state
        return <div>Error loading videos</div>;
    }

    return (
        <div>
            <div></div>
        </div>
    );
};

export default Videos;
