import React from "react";
import { NodeProps, Position } from "@xyflow/react";
import { DiagramTable, DiagramColumn } from "@/types/workspace";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import TableHeader from "./table-header";
import ColumnRow from "./column-row";
import ConnectionHandle from "./connection-handle";

export default function TableCard(props: NodeProps) {
    const tableData = props.data as unknown as DiagramTable & {
        _selectedColumnId?: number | null;
        _isSelected?: boolean;
    };
    const columns: DiagramColumn[] = tableData.diagram_columns || [];
    const isSelected = tableData._isSelected || false;
    const selectedColumnId = tableData._selectedColumnId || null;

    const { selectColumn } = useWorkspace();

    const handleColumnSelect = (columnId: number) => {
        selectColumn(tableData.id, columnId);
    };

    return (
        <div
            className={`group/table w-56 rounded-xl border bg-white dark:bg-zinc-955 text-zinc-900 dark:text-zinc-100 font-sans select-none overflow-visible relative transition-all duration-150 ${
                isSelected
                    ? "border-zinc-900 dark:border-zinc-100 shadow-lg ring-1 ring-zinc-900/10 dark:ring-zinc-100/10"
                    : "border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700"
            }`}
        >
            {/* Table Level Handles */}
            <ConnectionHandle type="target" position={Position.Top} id={`table-${tableData.id}-top`} className="!top-[-3px]" />
            <ConnectionHandle type="source" position={Position.Bottom} id={`table-${tableData.id}-bottom`} className="!bottom-[-3px]" />
            <ConnectionHandle type="target" position={Position.Left} id={`table-${tableData.id}-left`} className="!left-[-3px] !top-5 !w-1.5 !h-4" />
            <ConnectionHandle type="source" position={Position.Right} id={`table-${tableData.id}-right`} className="!right-[-3px] !top-5 !w-1.5 !h-4" />

            <TableHeader
                name={tableData.name}
                icon={tableData.icon}
                color={tableData.color}
            />

            {/* Columns List */}
            <div className="divide-y divide-zinc-100 dark:divide-zinc-900/80">
                {columns.length === 0 ? (
                    <div className="px-3 py-3 text-center text-[10px] text-zinc-400 dark:text-zinc-600 font-mono italic">
                        No columns
                    </div>
                ) : (
                    columns.map((col) => (
                        <ColumnRow
                            key={col.id}
                            column={col}
                            isSelected={selectedColumnId === col.id}
                            onSelect={handleColumnSelect}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
