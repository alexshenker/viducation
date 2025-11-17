import { SWRHookResponse } from "@/utils/types";
import useSWR from "swr";
import getVideos, { VideosRes } from "../requests/getVideos";

// Key for SWR caching and mutation to be shared when uploading or editing videos
export const videos_key = "videos";

const useVideos = (): SWRHookResponse<VideosRes> => {
    const videos = useSWR(videos_key, getVideos);

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

export default useVideos;
