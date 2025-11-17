import { VideoId } from "./types";

/**
 * All page routes used in the application synced with the Next.js routing structure
 * This helps to avoid hardcoding URLs throughout the app
 * and ensures consistency and easier maintenance
 */
export const APP_ROUTES = {
    landing: "/",
    videos: "/videos",
    create_video: "/videos/create",
    video_page: (videoId: VideoId) => `/videos/${videoId}`,
};
