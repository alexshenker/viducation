"use client";

import Button from "@/components/Button";
import VideoCard from "@/components/VideoCard";
import useVideos from "@/lib/hooks/useVideos";
import { APP_ROUTES } from "@/utils/appRoutes";
import { useRouter } from "next/navigation";

const Videos = (): React.JSX.Element => {
    const videos = useVideos();

    const router = useRouter();

    if (videos.isLoading) {
        //@TODO: Add a better loading state
        return <div>Loading...</div>;
    }

    if (videos.hasError) {
        //@TODO: Add a better error state
        return <div>Error loading videos</div>;
    }

    return (
        <div className="p-4">
            <Button onClick={() => router.push(APP_ROUTES.create_video)}>
                Add Video
            </Button>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {videos.data.videos.map((video) => {
                    return <VideoCard key={video.id} video={video} />;
                })}
            </div>
        </div>
    );
};

export default Videos;
