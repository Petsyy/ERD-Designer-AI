import React from "react";
import { MousePointer2 } from "lucide-react";

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 flex items-center justify-center mb-3">
                <MousePointer2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
            </div>
            <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                No selection
            </p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 max-w-[160px] leading-relaxed">
                Click a table, column, or relationship to inspect and edit its properties.
            </p>
        </div>
    );
}
