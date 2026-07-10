import { Database, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface EmptyCanvasStateProps {
    onOpenAddModal: () => void;
}

export default function EmptyCanvasState({ onOpenAddModal }: EmptyCanvasStateProps) {
    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none">
            <div className="flex flex-col items-center justify-center max-w-xs text-center p-6 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm pointer-events-auto">
                <div className="w-10 h-10 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-3 border border-zinc-200 dark:border-zinc-800">
                    <Database className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    Empty Canvas
                </h3>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mb-4 leading-relaxed">
                    Add your first table to start designing your database schema.
                </p>
                <Button
                    onClick={onOpenAddModal}
                    className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-[11px] gap-1.5 font-medium px-4 py-1.5 h-7 rounded-md pointer-events-auto"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Create Table
                </Button>
            </div>
        </div>
    );
}
