import { SWRHookResponse, VideoId } from "@/utils/types";
import useSWR from "swr";
import getVideoComments, {
    CommentsResponse,
} from "../requests/getVideoComments";

// Key for SWR caching and mutation to be shared when posting a comment
export const comments_key = (videoId: VideoId) => ["comments", videoId];

const useComments = (videoId: VideoId): SWRHookResponse<CommentsResponse> => {
    const comments = useSWR(comments_key(videoId), () =>
        getVideoComments(videoId)
    );

    if (comments.isLoading) {
        return {
            isLoading: true,
            data: undefined,
            error: undefined,
            hasError: false,
            isValidating: true,
        };
    }

    if (comments.error) {
        return {
            isLoading: false,
            data: undefined,
            error: comments.error,
            hasError: true,
            isValidating: comments.isValidating,
        };
    }

    if (comments.data === undefined) {
        // This should never happen, but TypeScript needs the assurance
        return {
            isLoading: false,
            data: undefined,
            error: new Error("Data is undefined"),
            hasError: true,
            isValidating: comments.isValidating,
        };
    }

    return {
        isLoading: false,
        data: comments.data,
        error: undefined,
        hasError: false,
        isValidating: comments.isValidating,
    };
};

export default useComments;
