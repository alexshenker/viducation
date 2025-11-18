"use client";
import { APP_ROUTES } from "@/utils/appRoutes";
import { Video } from "@/utils/types";
import Link from "next/link";

interface Props {
    video: Video;
}

const VideoCard = (props: Props): React.JSX.Element => {
    return (
        <Link href={APP_ROUTES.video_page(props.video.id)}>
            <div className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg dark:shadow-gray-700/25 bg-white dark:bg-gray-900 h-full">
                <div>
                    <video
                        className="h-40 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-50 dark:shadow-gray-700/25"
                        src={props.video.video_url}
                        muted //Muted to allow autoplay on hover (most browsers block autoplay with sound)
                        playsInline //Important for iOS devices to allow autoplay in small players otherwise it goes fullscreen
                        preload="metadata"
                        //Play on hover for better UX
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                        }}
                    />
                </div>

                <div className="p-4 sm:p-5">
                    <time
                        dateTime={props.video.created_at.toISOString()}
                        className="block text-xs text-gray-500 dark:text-gray-400"
                        suppressHydrationWarning // Prevent hydration mismatch due to locale differences
                    >
                        {props.video.created_at.toLocaleDateString("en-US", {
                            // ex: Jan 1, 2024
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </time>

                    <h3 className="mt-0.5 text-lg text-gray-900 dark:text-white">
                        {props.video.title}
                    </h3>
                    <p className="mt-1 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                        {props.video.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
