import { mutate } from "swr";
import putVideo, { EditVideoBody } from "../requests/putVideo";
import { videos_key } from "./useVideos";

const useEditVideo = () => {
    const editVideo = async (videoBody: EditVideoBody) => {
        await putVideo(videoBody);

        await mutate(videos_key);
    };

    return { editVideo };
};

export default useEditVideo;
