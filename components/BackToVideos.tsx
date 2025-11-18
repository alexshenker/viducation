import { APP_ROUTES } from "@/utils/appRoutes";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function BackToVideos() {
    const router = useRouter();

    return (
        <Button
            size="sm"
            onClick={() => {
                router.push(APP_ROUTES.videos);
            }}
        >
            <p className="text-3xl">←</p>
        </Button>
    );
}
