import React from "react";

export default function SelectionLayer() {
    return (
        <div className="absolute bottom-4 right-4 z-10 pointer-events-none select-none">
            <div className="px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xs shadow-xs text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                <span className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 px-1 py-0.5 rounded mr-1">Shift</span>
                Drag or click to multi-select
            </div>
        </div>
    );
}
