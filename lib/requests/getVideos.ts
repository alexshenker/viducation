import { API_ROUTES } from "@/utils/apiRoutes";
import { Video } from "@/utils/types";
import z from "zod";

const VideosRes = z.object({
    videos: z.array(Video),
});

export type VideosRes = z.infer<typeof VideosRes>;

const getVideos = async (): Promise<VideosRes> => {
    const res = await fetch(API_ROUTES.get_videos, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch videos");
    }

    const data = await res.json();

    const parsed = VideosRes.safeParse(data);

    if (parsed.success) {
        return parsed.data;
    }

    console.error(`[${getVideos.name}]: Invalid response format`, parsed.error);

    throw new Error(
        `[${getVideos.name}]: Invalid response format: ${parsed.error.message}`
    );
};

export default getVideos;
