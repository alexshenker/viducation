import Link from "next/link";

export default function Home() {
    return (
        <div className="">
            <main className="flex min-h-screen items-center justify-center px-6">
                <div className="max-w-4xl w-full space-y-16 text-center">
                    {/* Hero */}
                    <div className="space-y-6">
                        <h1 className="text-7xl md:text-8xl font-black text-black dark:text-white tracking-tight">
                            Viducation
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Learn through video. Master your craft.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <div className="space-y-2">
                            <div className="text-4xl mb-3 text-gray-700 dark:text-gray-300">
                                ▶
                            </div>
                            <h3 className="font-semibold text-black dark:text-white">
                                Expert Videos
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Professional instruction
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl mb-3">📚</div>
                            <h3 className="font-semibold text-black dark:text-white">
                                Structured Learning
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Clear learning paths
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl mb-3 text-gray-700 dark:text-gray-300">
                                ✓
                            </div>
                            <h3 className="font-semibold text-black dark:text-white">
                                Track Progress
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Monitor your growth
                            </p>
                        </div>
                    </div>

                    <div>
                        <Link
                            href="/videos"
                            className="group inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-black dark:text-black dark:bg-white rounded-full transition-all hover:gap-3 hover:shadow-lg"
                        >
                            Start Learning
                            <span className="text-xl transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>

                    <div className="flex justify-center gap-12 pt-8 text-sm text-gray-500 dark:text-gray-500">
                        <div>
                            <div className="font-bold text-2xl text-black dark:text-white">
                                500+
                            </div>
                            <div>Videos</div>
                        </div>
                        <div>
                            <div className="font-bold text-2xl text-black dark:text-white">
                                50K+
                            </div>
                            <div>Learners</div>
                        </div>
                        <div>
                            <div className="font-bold text-2xl text-black dark:text-white">
                                98%
                            </div>
                            <div>Satisfied</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
