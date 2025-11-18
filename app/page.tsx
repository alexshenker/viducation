"use client";
import Button from "@/components/Button";
import CreateVideo from "@/components/forms/CreateVideo";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import VideoCard from "@/components/VideoCard";
import { VideoId } from "@/utils/types";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div>
                    <Input placeholder="Type here..." label="Sample Input" />
                    <Textarea
                        placeholder="Type here..."
                        label="Sample Textarea"
                    />
                    <Button>Test</Button>
                    <VideoCard
                        video={{
                            id: "dQw4w9WgXcQ" as VideoId,
                            title: "Test",
                            description: "test test test",
                            video_url:
                                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                            num_comments: 0,
                            created_at: new Date(),
                        }}
                    />
                    <CreateVideo />
                </div>
            </main>
        </div>
    );
}
