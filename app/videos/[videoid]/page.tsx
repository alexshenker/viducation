"use client";
import VideoCard from "@/components/VideoCard";
import useVideo from "@/lib/hooks/useVideo";
import useVideos from "@/lib/hooks/useVideos";
import { VideoId } from "@/utils/types";
import { useParams } from "next/navigation";

const VideoPage = (): React.JSX.Element => {
    const param = useParams<{ videoid: VideoId }>();

    //@TODO: Handle missing videoid param

    const video = useVideo(param.videoid);

    const videos = useVideos();

    if (video.isLoading) {
        //@TODO: Add a better loading state
        return <div>Loading...</div>;
    }

    if (video.hasError) {
        //@TODO: Add a better error state
        return <div>Error loading video</div>;
    }

    return (
        <div className="p-4 sm:p-5 flex sm:flex-row flex-col">
            <div className="max-w-4xl w-full">
                <video controls src={video.data.video.video_url} />
                <h3 className="my-1.5 text-xl font-bold text-gray-900 dark:text-white">
                    {video.data.video.title}
                </h3>
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="mt-1 line-clamp-3 text-md text-gray-500 dark:text-gray-300">
                        {video.data.video.description}
                    </p>
                </div>
            </div>
            <div className="w-full sm:w-60 p-0 sm:p-2 flex flex-col gap-3">
                {videos.isLoading ? (
                    <div>Loading more videos...</div>
                ) : videos.hasError ? (
                    <div>Error loading more videos</div>
                ) : (
                    videos.data.videos
                        //Don't show the current video in the related videos list
                        .filter((vid) => vid.id !== video.data.video.id)
                        //Show only some other videos, not all
                        .slice(0, 3)
                        .map((vid) => {
                            return <VideoCard key={vid.id} video={vid} />;
                        })
                )}
            </div>
        </div>
    );
};

export default VideoPage;
