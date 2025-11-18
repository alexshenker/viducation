import { API_ROUTES } from "@/utils/apiRoutes";
import { Video } from "@/utils/types";
import z from "zod";

/**
 * I've uploaded some videos with invalid urls. since there's no API delete function, I need to filter them out as they can't be shown the way I need them to be.
 */
const filterInvalidVideos = (videos: Video[]): Video[] => {
    return videos.filter((video) => {
        return z.url().safeParse(video.video_url).success;
    });
};

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
        return {
            videos: filterInvalidVideos(parsed.data.videos),
        };
    }

    console.error(`[${getVideos.name}]: Invalid response format`, parsed.error);

    throw new Error(
        `[${getVideos.name}]: Invalid response format: ${parsed.error.message}`
    );
};

export default getVideos;
