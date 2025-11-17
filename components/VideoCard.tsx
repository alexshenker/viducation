import { APP_ROUTES } from "@/utils/appRoutes";
import { Video } from "@/utils/types";
import Link from "next/link";

interface Props {
    video: Video;
}

const VideoCard = (props: Props): React.JSX.Element => {
    return (
        <Link href={APP_ROUTES.video_page(props.video.id)}>
            <div>
                <div>
                    <video
                        src={props.video.video_url}
                        muted
                        playsInline
                        preload="metadata"
                    />
                </div>

                <div>
                    <h3>{props.video.title}</h3>
                    <p>{props.video.description}</p>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
