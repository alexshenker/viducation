import z from "zod";

//Branded types for better type safety
export type UserId = string & { __brand: "UserId" };
export const UserId = z.custom<UserId>((val) => typeof val === "string");

export type VideoId = string & { __brand: "VideoId" };
export const VideoId = z.custom<VideoId>((val) => typeof val === "string");

/**
 * Coerces any valid date input (string, number, Date) into a Date object
 */
export const DateSchema = z.coerce.date();

export const Video = z.object({
    id: VideoId,
    video_url: z.string(), // Cannot user z.url() because DB has some invalid URLs from testing. There's also no Delete api available in the Test DB. This is a workaround for this project specifically.
    title: z.string(),
    description: z.string(),
    num_comments: z.number().int().nonnegative(),
    created_at: DateSchema,
});

export type Video = z.infer<typeof Video>;

export const Comment = z.object({
    id: z.string(), // Not branded until a need arises
    video_id: VideoId,
    user_id: UserId,
    created_at: DateSchema,
    content: z.string(),
});

type LoadingState = {
    isLoading: true;
    isValidating: true;
    data: undefined;
    error: undefined;
    hasError: false;
};

type ErrorState = {
    isLoading: false;
    data: undefined;
    error: Error;
    hasError: true;
    isValidating: boolean;
};

type LoadedState<T> = {
    isLoading: false;
    data: T;
    error: undefined;
    hasError: false;
    isValidating: boolean;
};

/**
 * Strong typing for SWR hook response states
 */
export type SWRHookResponse<T> = LoadingState | ErrorState | LoadedState<T>;
