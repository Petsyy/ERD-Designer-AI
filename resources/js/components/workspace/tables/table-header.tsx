import React from "react";
import { Table, Database, Hash, FileText, LayoutGrid } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
    Table,
    Database,
    Hash,
    LayoutGrid,
    FileText,
};

interface TableHeaderProps {
    name: string;
    icon?: string | null;
    color?: string | null;
}

export default function TableHeader({ name, icon, color }: TableHeaderProps) {
    const IconComponent = ICON_MAP[icon || "Table"] || Table;
    const hasColor = color && color !== "#ffffff";

    return (
        <div
            className="px-3 py-2.5 rounded-t-[11px] flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800"
            style={{
                backgroundColor: hasColor ? color : undefined,
                color: hasColor ? "#ffffff" : undefined,
            }}
        >
            <IconComponent className="w-3.5 h-3.5 shrink-0 opacity-80" />
            <span className="font-mono text-[11px] font-semibold tracking-tight truncate">
                {name}
            </span>
        </div>
    );
}
