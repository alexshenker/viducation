"use client";
import BackToVideos from "@/components/BackToVideos";
import Button from "@/components/Button";
import ErrorBox from "@/components/ErrorBox";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import Textarea from "@/components/Textarea";
import VideoCard from "@/components/VideoCard";
import useComments from "@/lib/hooks/useComments";
import useEditVideo from "@/lib/hooks/useEditVideo";
import usePostComment from "@/lib/hooks/usePostComment";
import useVideo from "@/lib/hooks/useVideo";
import useVideos from "@/lib/hooks/useVideos";
import { APP_ROUTES } from "@/utils/appRoutes";
import { UserId, VideoId } from "@/utils/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const VideoPage = (): React.JSX.Element => {
    const random_user_id = useId();

    const param = useParams<{ videoid: VideoId }>();

    const router = useRouter();

    //@TODO: Handle missing videoid param
    const [editMode, setEditMode] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");

    const [description, setDescription] = useState<string>("");

    const [newComment, setNewComment] = useState<string>("");

    const [error, setError] = useState<string>("");

    const comments = useComments(param.videoid);

    const initialDataSet = useRef<boolean>(false);

    const { editVideo } = useEditVideo();
    const { createComment } = usePostComment();

    const [mutating, setMutating] = useState<boolean>(false);

    const callAddComment = async () => {
        if (newComment.trim() === "") {
            setError("Comment cannot be empty.");
            return;
        }

        setMutating(true);

        try {
            await createComment({
                user_id: ("random_user_" + random_user_id) as UserId,
                video_id: param.videoid,
                content: newComment.trim(),
            });

            setNewComment("");
            setError("");
        } catch (error) {
            setError("Error adding comment. Please try again.");
        } finally {
            setMutating(false);
        }
    };

    const callEditVideo = async () => {
        if (video.data === undefined) {
            setError("Video data is not loaded yet.");
            return;
        }

        if (title.trim() === "") {
            setError("Title cannot be empty.");
            return;
        }

        if (
            video.data.video.title === title.trim() &&
            video.data.video.description === description.trim()
        ) {
            setError("No changes made to the video.");
            return;
        }
        setMutating(true);

        try {
            await editVideo({
                video_id: param.videoid,
                title: title.trim(),
                description: description.trim(),
            });

            setEditMode(false);
            setError("");
        } catch (error) {
            setError("Error editing video. Please try again.");
        } finally {
            setMutating(false);
        }
    };

    const video = useVideo(param.videoid);

    const videos = useVideos();

    useEffect(() => {
        if (initialDataSet.current === true) {
            // Prevent overwriting user edits
            return;
        }

        if (video.isLoading || video.hasError) {
            return;
        }

        setTitle(video.data.video.title);

        setDescription(video.data.video.description);

        initialDataSet.current = true;
    }, [
        video.data?.video.description,
        video.data?.video.title,
        video.hasError,
        video.isLoading,
    ]);

    if (video.isLoading) {
        return <Loading />;
    }

    if (video.hasError) {
        return (
            <div className="text-center space-y-4">
                <div className="text-6xl">⚠️</div>
                <h2 className="text-2xl font-bold text-black dark:text-white">
                    Video Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    This video may have been removed or the link is incorrect
                </p>
                <Button onClick={() => router.push(APP_ROUTES.videos)}>
                    Back to Videos
                </Button>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-5">
            {mutating && <Loading />}

            {error.trim() !== "" && <ErrorBox>{error}</ErrorBox>}

            <BackToVideos />
            <div className="flex sm:flex-row flex-col mt-1">
                <div className="w-full">
                    <video
                        controls
                        src={video.data.video.video_url}
                        aria-label={`Video: ${video.data.video.title}`}
                    />
                    {editMode ? (
                        <div>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={1}
                            />
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => {
                                        setEditMode(false);
                                        //Reset fields to original values
                                        setTitle(video.data.video.title);
                                        setDescription(
                                            video.data.video.description
                                        );
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onClick={callEditVideo}
                                    disabled={mutating}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="my-1.5 text-xl font-bold text-gray-900 dark:text-white">
                                    {video.data.video.title}
                                </h3>

                                <Button onClick={() => setEditMode(true)}>
                                    Edit
                                </Button>
                            </div>
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <p className="mt-1 line-clamp-3 text-md text-gray-500 dark:text-gray-300">
                                    {video.data.video.description}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Comments Section */}
                    <div className="mt-6">
                        <div>
                            <Textarea
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <Button
                                    onClick={callAddComment}
                                    disabled={
                                        mutating || newComment.trim() === ""
                                    }
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>

                        <div className="my-2">
                            {comments.isLoading ? (
                                <p className="text-gray-900 dark:text-white">
                                    Loading comments...
                                </p>
                            ) : comments.hasError ? (
                                <p className="text-gray-900 dark:text-white">
                                    Error loading comments
                                </p>
                            ) : comments.data.comments.length === 0 ? (
                                <p className="text-gray-900 dark:text-white">
                                    No comments yet.
                                </p>
                            ) : (
                                comments.data.comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="mb-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                                    >
                                        <p className="text-xs text-gray-900 dark:text-white">
                                            {comment.user_id}{" "}
                                            <span className="text-[10px]">
                                                {new Date(
                                                    comment.created_at
                                                ).toLocaleString()}
                                            </span>
                                        </p>
                                        <p className="text-gray-900 dark:text-white">
                                            {comment.content}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-60 p-0 sm:p-2 flex flex-col gap-3">
                    {videos.isLoading ? (
                        <div>Loading more videos...</div>
                    ) : videos.hasError ? (
                        <div>Error loading more videos</div>
                    ) : (
                        videos.data.videos
                            //Don't show the current video in the related videos list
                            .filter((vid) => vid.id !== video.data.video.id)
                            //Show only some other videos, not all
                            .slice(0, 3)
                            .map((vid) => {
                                return <VideoCard key={vid.id} video={vid} />;
                            })
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPage;
