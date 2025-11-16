import { API_ROUTES } from "@/utils/apiRoutes";
import { Comment, VideoId } from "@/utils/types";
import z from "zod";

const Res = z.object({
    comments: z.array(Comment),
});

type Res = z.infer<typeof Res>;

const getVideoComments = async (videoId: VideoId): Promise<Res> => {
    const res = await fetch(API_ROUTES.get_video_comments(videoId), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(
            `Failed to fetch comments for video with id ${videoId}`
        );
    }

    const data = await res.json();

    const parsed = Res.safeParse(data);

    if (parsed.success) {
        return parsed.data;
    }

    throw new Error(
        `[${getVideoComments.name}]: Invalid response format: ${parsed.error.message}`
    );
};

export default getVideoComments;
