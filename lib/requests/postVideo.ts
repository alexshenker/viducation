import { API_ROUTES } from "@/utils/apiRoutes";
import { VideoId } from "@/utils/types";

export type PostVideoBody = {
    video_id: VideoId;
    title: string;
    description: string;
};

const postVideo = async (body: PostVideoBody): Promise<void> => {
    const res = await fetch(API_ROUTES.post_video, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`Failed to update video with id ${body.video_id}`);
    }

    return;
};

export default postVideo;
