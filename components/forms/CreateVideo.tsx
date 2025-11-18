import useCreateVideo from "@/lib/hooks/useCreateVideo";
import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Textarea from "../Textarea";

const CreateVideo = (): React.JSX.Element => {
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const { createVideo } = useCreateVideo();

    const enableSubmit =
        videoUrl.length > 0 && title.length > 0 && description.length > 0;

    const callCreateVideo = async () => {
        if (!enableSubmit) {
            // @TODO: Show some error to the user
            return;
        }

        // @TODO: Additional validation logic... valid url, valid title, etc.
        // Loading...
        try {
            await createVideo({
                video_url: videoUrl,
                title,
                description,
            });
        } catch {
            //@TODO: Show some error to the user
        } finally {
            //@TODO:  loading state false

            setVideoUrl("");
            setTitle("");
            setDescription("");
        }
    };

    return (
        <div className="mx-auto max-w-md space-y-3 rounded-lg border border-gray-300 bg-gray-100 p-6 dark:border-gray-600 dark:bg-gray-800">
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
