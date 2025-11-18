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
            <div className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg dark:shadow-gray-700/25">
                <div>
                    <video
                        className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-50 dark:shadow-gray-700/25"
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

                <div>
                    <h5>{props.video.title}</h5>
                    <p>{props.video.description}</p>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
