import useSWR from "swr";
import getVideos, { VideosRes } from "../requests/getVideos";

type LoadingState = {
    isLoading: true;
    data: undefined;
    error: undefined;
};

type ErrorState = {
    isLoading: false;
    data: undefined;
    error: Error;
};

type LoadedState = {
    isLoading: false;
    data: VideosRes;
    error: undefined;
};

/**
 * Strong typing for SWR hook response states
 */
type HookResponse = LoadingState | ErrorState | LoadedState;

// Key for SWR caching and mutation to be shared when uploading or editing videos
export const videos_key = "videos";

const useVideos = (): HookResponse => {
    const videos = useSWR(videos_key, getVideos);

    if (videos.isLoading) {
        return {
            isLoading: true,
            data: undefined,
            error: undefined,
        };
    }

    if (videos.error) {
        return {
            isLoading: false,
            data: undefined,
            error: videos.error,
        };
    }

    if (videos.data === undefined) {
        // This should never happen, but TypeScript needs the assurance
        return {
            isLoading: false,
            data: undefined,
            error: new Error("Data is undefined"),
        };
    }

    return {
        isLoading: false,
        data: videos.data,
        error: undefined,
    };
};

export default useVideos;
