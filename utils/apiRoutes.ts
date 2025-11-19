import { USER_ID } from "@/DEMO_ENV";
import { VideoId } from "./types";

const VIDEOS_BASE_URL =
    "https://take-home-assessment-423502.uc.r.appspot.com/api/videos";

// All API routes used in the application
export const API_ROUTES = {
    post_video: VIDEOS_BASE_URL,
    get_videos: `${VIDEOS_BASE_URL}?user_id=${USER_ID}`,
    put_video: VIDEOS_BASE_URL,
    get_single_video: (videoId: VideoId) => {
        return `${VIDEOS_BASE_URL}/single?video_id=${videoId}`;
    },
    post_video_comment: `${VIDEOS_BASE_URL}/comments`,
    get_video_comments: (videoId: VideoId) => {
        return `${VIDEOS_BASE_URL}/comments?video_id=${videoId}`;
    },
};
