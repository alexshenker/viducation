import { VideoId } from "@/utils/types";
import useSWR from "swr";
import getVideo, { VideoResponse } from "../requests/getVideo";

type LoadingState = {
    isLoading: true;
    data: undefined;
    error: undefined;
    hasError: false;
};

type ErrorState = {
    isLoading: false;
    data: undefined;
    error: Error;
    hasError: true;
};

type LoadedState = {
    isLoading: false;
    data: VideoResponse;
    error: undefined;
    hasError: false;
};

/**
 * Strong typing for SWR hook response states
 */
type HookResponse = LoadingState | ErrorState | LoadedState;

// Key for SWR caching and mutation to be shared when editing a video
export const video_key = (videoId: VideoId) => ["video", videoId];

const useVideo = (videoId: VideoId): HookResponse => {
    const videos = useSWR(video_key(videoId), () => getVideo(videoId));

    if (videos.isLoading) {
        return {
            isLoading: true,
            data: undefined,
            error: undefined,
            hasError: false,
        };
    }

    if (videos.error) {
        return {
            isLoading: false,
            data: undefined,
            error: videos.error,
            hasError: true,
        };
    }

    if (videos.data === undefined) {
        // This should never happen, but TypeScript needs the assurance
        return {
            isLoading: false,
            data: undefined,
            error: new Error("Data is undefined"),
            hasError: true,
        };
    }

    return {
        isLoading: false,
        data: videos.data,
        error: undefined,
        hasError: false,
    };
};

export default useVideo;
