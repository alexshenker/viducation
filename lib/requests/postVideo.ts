import { USER_ID } from "@/DEMO_ENV";
import { API_ROUTES } from "@/utils/apiRoutes";

export type PostVideoBody = {
    video_url: string;
    title: string;
    description: string;
};

const postVideo = async (body: PostVideoBody): Promise<void> => {
    const res = await fetch(API_ROUTES.post_video, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...body,
            user_id: USER_ID,
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to post video");
    }

    return;
};

export default postVideo;
