import { Database } from "lucide-react";

interface TableCounterProps {
    count: number;
}

export default function TableCounter({ count }: TableCounterProps) {
    return (
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800">
            <Database className="w-3 h-3" />
            <span>{count}</span>
        </div>
    );
}
