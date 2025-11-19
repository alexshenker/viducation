"use client";

import BackToVideos from "@/components/BackToVideos";
import CreateVideo from "@/components/forms/CreateVideo";

const CreateVideoPage = (): React.JSX.Element => {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-2xl">
                <div className="mb-8">
                    <BackToVideos />
                </div>

                <div className="bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-zinc-800 p-8 shadow-xl">
                    <h1 className="text-4xl font-black text-black dark:text-white mb-2">
                        Add New Video
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Share knowledge with your audience
                    </p>

                    <CreateVideo />
                </div>
            </div>
        </div>
    );
};

export default CreateVideoPage;
