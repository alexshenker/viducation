"use client";

import CreateVideo from "@/components/forms/CreateVideo";

const CreateVideoPage = (): React.JSX.Element => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-lg w-full">
                <CreateVideo />
            </div>
        </div>
    );
};

export default CreateVideoPage;
