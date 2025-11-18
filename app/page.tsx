import { APP_ROUTES } from "@/utils/appRoutes";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div>
                    <h2 className="text-2xl font-bold">Welcome to</h2>
                    <h1 className="mt-2 text-6xl font-extrabold">Viducation</h1>

                    <Link
                        className="mt-20 inline-block text-gray-600 dark:text-gray-400 hover:underline"
                        href={APP_ROUTES.videos}
                    >
                        <div className="border inline-flex items-center gap-2 rounded-sm border-gray-300 px-2 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
                            Start <span className="text-2xl">→</span>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
