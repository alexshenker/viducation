"use client";
import useVideo from "@/lib/hooks/useVideo";
import { VideoId } from "@/utils/types";
import { useParams } from "next/navigation";

const VideoPage = (): React.JSX.Element => {
    const param = useParams<{ videoid: VideoId }>();

    //@TODO: Handle missing videoid param

    const video = useVideo(param.videoid);

    if (video.isLoading) {
        //@TODO: Add a better loading state
        return <div>Loading...</div>;
    }

    if (video.hasError) {
        //@TODO: Add a better error state
        return <div>Error loading video</div>;
    }

    return (
        <div>
            <video controls src={video.data.video.video_url} />
        </div>
    );
};

export default VideoPage;
