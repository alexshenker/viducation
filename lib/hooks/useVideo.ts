import { SWRHookResponse, VideoId } from "@/utils/types";
import useSWR from "swr";
import getVideo, { VideoResponse } from "../requests/getVideo";

// Key for SWR caching and mutation to be shared when editing a video
export const video_key = (videoId: VideoId) => ["video", videoId];

const useVideo = (videoId: VideoId): SWRHookResponse<VideoResponse> => {
    const videos = useSWR(video_key(videoId), () => getVideo(videoId));

    if (videos.isLoading) {
        return {
            isLoading: true,
            data: undefined,
            error: undefined,
            hasError: false,
            isValidating: true,
        };
    }

    if (videos.error) {
        return {
            isLoading: false,
            data: undefined,
            error: videos.error,
            hasError: true,
            isValidating: videos.isValidating,
        };
    }

    if (videos.data === undefined) {
        // This should never happen, but TypeScript needs the assurance
        return {
            isLoading: false,
            data: undefined,
            error: new Error("Data is undefined"),
            hasError: true,
            isValidating: videos.isValidating,
        };
    }

    return {
        isLoading: false,
        data: videos.data,
        error: undefined,
        hasError: false,
        isValidating: videos.isValidating,
    };
};

export default useVideo;
