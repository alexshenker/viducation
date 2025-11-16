import { API_ROUTES } from "@/utils/apiRoutes";
import { Video, VideoId } from "@/utils/types";
import z from "zod";

const Res = z.object({
    video: Video,
});

type Res = z.infer<typeof Res>;

const getVideo = async (videoId: VideoId): Promise<Res> => {
    const res = await fetch(API_ROUTES.get_single_video(videoId), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch video with id ${videoId}`);
    }

    const data = await res.json();

    const parsed = Res.safeParse(data);

    if (parsed.success) {
        return parsed.data;
    }

    throw new Error(
        `[${getVideo.name}]: Invalid response format: ${parsed.error.message}`
    );
};

export default getVideo;
