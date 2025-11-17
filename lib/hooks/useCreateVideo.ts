import { mutate } from "swr";
import postVideo, { PostVideoBody } from "../requests/postVideo";
import { videos_key } from "./useVideos";

const useCreateVideo = () => {
    const createVideo = async (videoBody: PostVideoBody) => {
        await postVideo(videoBody);

        await mutate(videos_key);
    };

    return { createVideo };
};

export default useCreateVideo;
