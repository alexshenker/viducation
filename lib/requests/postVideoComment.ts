import { API_ROUTES } from "@/utils/apiRoutes";
import { UserId, VideoId } from "@/utils/types";

export type PostVideoCommentBody = {
    video_id: VideoId;
    content: string;
    user_id: UserId;
};

const postVideoComment = async (body: PostVideoCommentBody): Promise<void> => {
    const res = await fetch(API_ROUTES.post_video_comment, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(
            `Failed to post comment for video with id ${body.video_id}`
        );
    }

    return;
};

export default postVideoComment;
