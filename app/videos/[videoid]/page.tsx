"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import VideoCard from "@/components/VideoCard";
import useEditVideo from "@/lib/hooks/useEditVideo";
import useVideo from "@/lib/hooks/useVideo";
import useVideos from "@/lib/hooks/useVideos";
import { VideoId } from "@/utils/types";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const VideoPage = (): React.JSX.Element => {
    const param = useParams<{ videoid: VideoId }>();

    //@TODO: Handle missing videoid param
    const [editMode, setEditMode] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");

    const [description, setDescription] = useState<string>("");

    const initialDataSet = useRef<boolean>(false);

    const { editVideo } = useEditVideo();

    const [mutating, setMutating] = useState<boolean>(false);

    const callEditVideo = async () => {
        if (video.data === undefined) {
            //Video hasn't loaded yet
            return;
        }

        if (title.trim() === "") {
            //Title cannot be empty
            return;
        }

        if (video.data.video.title === title) {
            //No changes to title
            return;
        }

        if (video.data.video.description === description) {
            //No changes to description
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
        } catch (error) {
            // Handle error
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
        description,
        title,
        video.data?.video.description,
        video.data?.video.title,
        video.hasError,
        video.isLoading,
    ]);

    if (video.isLoading) {
        //@TODO: Add a better loading state
        return <div>Loading...</div>;
    }

    if (video.hasError) {
        //@TODO: Add a better error state
        return <div>Error loading video</div>;
    }

    return (
        <div className="p-4 sm:p-5 flex sm:flex-row flex-col">
            <div className="max-w-4xl w-full">
                <video controls src={video.data.video.video_url} />
                {editMode ? (
                    <div>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

                            <Button onClick={callEditVideo} disabled={mutating}>
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
    );
};

export default VideoPage;
