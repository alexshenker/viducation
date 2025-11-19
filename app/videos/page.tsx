"use client";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import VideoCard from "@/components/VideoCard";
import useVideos from "@/lib/hooks/useVideos";
import { APP_ROUTES } from "@/utils/appRoutes";
import { useRouter } from "next/navigation";

const Videos = (): React.JSX.Element => {
    const videos = useVideos();
    const router = useRouter();

    if (videos.isLoading) {
        return <Loading text="Loading videos..." />;
    }

    if (videos.hasError) {
        return (
            <div className="text-center space-y-4">
                <div className="text-6xl">⚠️</div>
                <h2 className="text-2xl font-bold text-black dark:text-white">
                    Error Loading Videos
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Please try again later
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-black text-black dark:text-white mb-6">
                        Video Library
                    </h1>
                    <div className="flex flex-wrap gap-3">
                        <Button onClick={() => router.push(APP_ROUTES.landing)}>
                            ← Back to Home
                        </Button>
                        <Button
                            onClick={() => router.push(APP_ROUTES.create_video)}
                        >
                            + Add Video
                        </Button>
                    </div>
                </div>

                {/* Video Grid */}
                {videos.data.videos.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📹</div>
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                            No videos yet
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Start building your library
                        </p>
                        <Button
                            onClick={() => router.push(APP_ROUTES.create_video)}
                        >
                            Add Your First Video
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {videos.data.videos.map((video) => {
                            return <VideoCard key={video.id} video={video} />;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Videos;
