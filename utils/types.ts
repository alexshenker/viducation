import z from "zod";

//Branded types for better type safety
export type UserId = string & { __brand: "UserId" };
export const UserId = z.custom<UserId>((val) => typeof val === "string");

export type VideoId = string & { __brand: "VideoId" };
export const VideoId = z.custom<VideoId>((val) => typeof val === "string");

/** 
 * Dates appear to be coming back as ISO strings, so I validate this and transform them into
date objects for easier use later on. 
*/
export const DateSchema = z.iso.datetime().transform((str) => new Date(str));

export const Video = z.object({
    id: VideoId,
    video_url: z.url(),
    title: z.string(),
    description: z.string(),
    num_comments: z.number().int().nonnegative(),
    created_at: DateSchema,
});

export const Comment = z.object({
    id: z.string(), // Not branded until a need arises
    video_id: VideoId,
    user_id: UserId,
    created_at: DateSchema,
    content: z.string(),
});
