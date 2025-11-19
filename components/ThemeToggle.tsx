"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        if (mounted) {
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const savedTheme = localStorage.getItem("theme") as
            | "light"
            | "dark"
            | null;

        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        //If no saved theme, use system preference
        const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

        setTheme(initialTheme);

        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        }
    }, [mounted]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    // Prevent hydration mismatch: Server can't access localStorage/window,
    // so we wait for client-side mount before rendering to avoid flash of wrong icon
    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 p-2.5 rounded-lg bg-gray-200 dark:bg-gray-800  backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl"
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-900" />
            ) : (
                <Sun className="w-5 h-5 text-white" />
            )}
        </button>
    );
}
