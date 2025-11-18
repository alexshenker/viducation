import { mutate } from "swr";
import putVideo, { EditVideoBody } from "../requests/putVideo";
import { video_key } from "./useVideo";
import { videos_key } from "./useVideos";

const useEditVideo = () => {
    const editVideo = async (videoBody: EditVideoBody) => {
        await putVideo(videoBody);

        mutate(videos_key);
        mutate(video_key(videoBody.video_id));
    };

    return { editVideo };
};

export default useEditVideo;
