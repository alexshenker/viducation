import { API_ROUTES } from "@/utils/apiRoutes";
import { VideoId } from "@/utils/types";

export type EditVideoBody = {
    video_id: VideoId;
    title: string;
    description: string;
};

const putVideo = async (body: EditVideoBody): Promise<void> => {
    const res = await fetch(API_ROUTES.put_video, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error("Failed to post video");
    }

    return;
};

export default putVideo;
