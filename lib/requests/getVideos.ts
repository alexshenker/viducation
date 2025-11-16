import { API_ROUTES } from "@/utils/apiRoutes";
import { UserId, Video } from "@/utils/types";
import z from "zod";

const Res = z.object({
    videos: z.array(Video),
});

type Res = z.infer<typeof Res>;

const getVideos = async (userId: UserId): Promise<Res> => {
    const res = await fetch(API_ROUTES.get_videos(userId), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch videos for user with id ${userId}`);
    }

    const data = await res.json();

    const parsed = Res.safeParse(data);

    if (parsed.success) {
        return parsed.data;
    }

    throw new Error(
        `[${getVideos.name}]: Invalid response format: ${parsed.error.message}`
    );
};

export default getVideos;
