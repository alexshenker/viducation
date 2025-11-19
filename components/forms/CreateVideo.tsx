import useCreateVideo from "@/lib/hooks/useCreateVideo";
import { isValidUrl } from "@/lib/requests/getVideos";
import { useState } from "react";
import Button from "../Button";
import ErrorBox from "../ErrorBox";
import Input from "../Input";
import Loading from "../Loading";
import Textarea from "../Textarea";

const CreateVideo = (): React.JSX.Element => {
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const { createVideo } = useCreateVideo();

    const [mutating, setMutating] = useState<boolean>(false);

    const [error, setError] = useState<string>("");

    const enableSubmit =
        videoUrl.length > 0 && title.length > 0 && description.length > 0;

    const clearForm = () => {
        setVideoUrl("");
        setTitle("");
        setDescription("");
    };

    const callCreateVideo = async () => {
        if (!enableSubmit) {
            setError("All fields are required.");
            return;
        }

        if (!isValidUrl(videoUrl)) {
            setError("Invalid video URL.");
            return;
        }

        // @TODO: Additional validation logic... valid url, valid title, etc.
        try {
            setMutating(true);
            await createVideo({
                video_url: videoUrl,
                title,
                description,
            });

            clearForm();
        } catch {
            setError("Error creating video.");
        } finally {
            setMutating(false);
        }
    };

    return (
        <div className="w-full space-y-2 rounded-lg border border-gray-300 bg-gray-100 p-6 dark:border-gray-600 dark:bg-gray-800">
            {mutating && <Loading />}
            {error.trim() !== "" && <ErrorBox>{error}</ErrorBox>}
            <form action="#">
                <Input
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    label="Video URL"
                />
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title"
                />
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="Description"
                />
            </form>

            <Button onClick={callCreateVideo} disabled={!enableSubmit}>
                Submit
            </Button>
        </div>
    );
};

export default CreateVideo;
