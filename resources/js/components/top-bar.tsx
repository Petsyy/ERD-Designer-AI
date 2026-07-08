import { Button } from "./ui/button";
import { Layers, Cloud, Settings } from "lucide-react";
import { Link } from "@inertiajs/react";

interface TopBarProps {
    project: {
        id: string;
        name: string;
    };
}

export default function TopBar({ project }: TopBarProps) {
    return (
        <div className="flex items-center justify-between h-12 px-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
                        <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                            ERD Designer
                        </span>
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {project.name}
                </span>

                <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <Cloud className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <Settings className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
