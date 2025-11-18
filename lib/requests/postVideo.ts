import { API_ROUTES } from "@/utils/apiRoutes";

export type PostVideoBody = {
    video_url: string;
    title: string;
    description: string;
};

const postVideo = async (body: PostVideoBody): Promise<void> => {
    const res = await fetch(API_ROUTES.post_video, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...body,
            user_id: "aleksey_shenker",
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to post video");
    }

    return;
};

export default postVideo;
