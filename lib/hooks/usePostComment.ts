import { mutate } from "swr";
import postVideoComment, {
    PostVideoCommentBody,
} from "../requests/postVideoComment";
import { comments_key } from "./useComments";

const usePostComment = () => {
    const createComment = async (commentBody: PostVideoCommentBody) => {
        await postVideoComment(commentBody);

        await mutate(comments_key(commentBody.video_id));
    };

    return { createComment };
};

export default usePostComment;
