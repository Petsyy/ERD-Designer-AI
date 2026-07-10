import React from "react";
import { Position } from "@xyflow/react";
import { Key, Link2 } from "lucide-react";
import { DiagramColumn } from "@/types/workspace";
import ConnectionHandle from "./connection-handle";

interface ColumnRowProps {
    column: DiagramColumn;
    isSelected: boolean;
    onSelect: (columnId: number) => void;
}

export default function ColumnRow({ column, isSelected, onSelect }: ColumnRowProps) {
    return (
        <div
            className={`group relative px-3 py-1.5 flex items-center justify-between text-xs cursor-pointer transition-colors ${
                isSelected
                    ? "bg-zinc-100 dark:bg-zinc-800"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
            }`}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(column.id);
            }}
        >
            {/* Left Handles */}
            <ConnectionHandle type="target" position={Position.Left} id={`col-${column.id}-target`} />
            <ConnectionHandle type="source" position={Position.Left} id={`col-${column.id}-left-source`} />

            <div className="flex items-center gap-1.5 truncate pr-2">
                {column.is_primary ? (
                    <span
                        title="Primary Key"
                        className="flex items-center gap-0.5 text-[9px] font-mono font-bold px-1 py-0.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    >
                        <Key className="w-2.5 h-2.5" />
                        PK
                    </span>
                ) : column.is_foreign ? (
                    <span
                        title="Foreign Key"
                        className="flex items-center gap-0.5 text-[9px] font-mono font-bold px-1 py-0.5 rounded border border-zinc-400 dark:border-zinc-650 text-zinc-600 dark:text-zinc-400"
                    >
                        <Link2 className="w-2.5 h-2.5" />
                        FK
                    </span>
                ) : (
                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700 shrink-0" />
                )}
                <span className="font-mono text-[11px] font-medium text-zinc-800 dark:text-zinc-200 truncate">
                    {column.name}
                </span>
            </div>

            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-tight shrink-0">
                {column.data_type}
            </span>

            {/* Right Handles */}
            <ConnectionHandle type="target" position={Position.Right} id={`col-${column.id}-right-target`} className="-mr-1.5" />
            <ConnectionHandle type="source" position={Position.Right} id={`col-${column.id}-source`} className="-mr-1.5" />
        </div>
    );
}
