"use client";

import BackToVideos from "@/components/BackToVideos";
import CreateVideo from "@/components/forms/CreateVideo";

const CreateVideoPage = (): React.JSX.Element => {
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen">
                <div>
                    <BackToVideos />
                    <div className="max-w-lg w-full mt-1">
                        <CreateVideo />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateVideoPage;
