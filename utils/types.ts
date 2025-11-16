//Branded types for better type safety
export type UserId = string & { __brand: "UserId" };

export type VideoId = string & { __brand: "VideoId" };
