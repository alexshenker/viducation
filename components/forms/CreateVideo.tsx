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

    const callCreateVideo = async () => {
        try {
            await createVideo({
                video_url: videoUrl,
                title,
                description,
            });
        } catch {}
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

            <Button>Submit</Button>
        </div>
    );
};

export default CreateVideo;
