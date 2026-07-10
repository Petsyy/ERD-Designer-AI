import React, { useState, useEffect } from "react";
import { Columns } from "lucide-react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { SectionLabel, FieldRow, FieldInput, FieldSelect, FieldToggle, DangerButton, Divider, DATA_TYPE_OPTIONS } from "./inspector";

export default function ColumnInspector() {
    const { selectedTable, selectedColumn, updateColumn, deleteColumn, selectTable } = useWorkspace();
    if (!selectedColumn || !selectedTable) return null;

    const [colName, setColName] = useState(selectedColumn.name);
    const [colType, setColType] = useState(selectedColumn.data_type);
    const [colLength, setColLength] = useState(selectedColumn.length?.toString() || "");
    const [colDefault, setColDefault] = useState(selectedColumn.default_value || "");
    const [colComment, setColComment] = useState(selectedColumn.comment || "");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setColName(selectedColumn.name);
        setColType(selectedColumn.data_type);
        setColLength(selectedColumn.length?.toString() || "");
        setColDefault(selectedColumn.default_value || "");
        setColComment(selectedColumn.comment || "");
    }, [selectedColumn.id]);

    const handleNameBlur = () => {
        if (colName.trim() && colName !== selectedColumn.name) {
            updateColumn(selectedColumn.id, { name: colName.trim(), data_type: colType } as any);
        }
    };

    const handleTypeChange = (val: string) => {
        setColType(val);
        updateColumn(selectedColumn.id, { name: colName, data_type: val } as any);
    };

    const handleLengthBlur = () => {
        const len = colLength ? parseInt(colLength) : null;
        if (len !== selectedColumn.length) {
            updateColumn(selectedColumn.id, { name: colName, data_type: colType, length: len } as any);
        }
    };

    const handleDefaultBlur = () => {
        if (colDefault !== (selectedColumn.default_value || "")) {
            updateColumn(selectedColumn.id, { name: colName, data_type: colType, default_value: colDefault || null } as any);
        }
    };

    const handleCommentBlur = () => {
        if (colComment !== (selectedColumn.comment || "")) {
            updateColumn(selectedColumn.id, { name: colName, data_type: colType, comment: colComment || null } as any);
        }
    };

    const toggleConstraint = (field: string, value: boolean) => {
        updateColumn(selectedColumn.id, { name: colName, data_type: colType, [field]: value } as any);
    };

    const handleDeleteColumn = async () => {
        if (!confirm(`Delete column "${selectedColumn.name}"?`)) return;
        setIsDeleting(true);
        await deleteColumn(selectedColumn.id);
        selectTable(selectedTable.id);
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2 bg-zinc-50/50 dark:bg-zinc-900/10">
                <Columns className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    Column
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                    in {selectedTable.name}
                </span>
            </div>

            {/* General */}
            <SectionLabel>General</SectionLabel>
            <FieldRow label="Name">
                <FieldInput value={colName} onChange={setColName} placeholder="column_name" mono onBlur={handleNameBlur} />
            </FieldRow>
            <FieldRow label="Data Type">
                <FieldSelect value={colType} onChange={handleTypeChange} options={DATA_TYPE_OPTIONS} />
            </FieldRow>
            <FieldRow label="Length">
                <FieldInput value={colLength} onChange={setColLength} placeholder="—" mono onBlur={handleLengthBlur} />
            </FieldRow>
            <FieldRow label="Default">
                <FieldInput value={colDefault} onChange={setColDefault} placeholder="—" mono onBlur={handleDefaultBlur} />
            </FieldRow>
            <FieldRow label="Comment">
                <FieldInput value={colComment} onChange={setColComment} placeholder="—" onBlur={handleCommentBlur} />
            </FieldRow>

            <Divider />

            {/* Constraints */}
            <SectionLabel>Constraints</SectionLabel>
            <FieldToggle label="Primary Key" checked={selectedColumn.is_primary} onChange={(v) => toggleConstraint("is_primary", v)} />
            <FieldToggle label="Nullable" checked={selectedColumn.is_nullable} onChange={(v) => toggleConstraint("is_nullable", v)} />
            <FieldToggle label="Unique" checked={selectedColumn.is_unique} onChange={(v) => toggleConstraint("is_unique", v)} />
            <FieldToggle label="Auto Increment" checked={selectedColumn.is_auto_increment} onChange={(v) => toggleConstraint("is_auto_increment", v)} />
            <FieldToggle label="Unsigned" checked={selectedColumn.is_unsigned} onChange={(v) => toggleConstraint("is_unsigned", v)} />

            <div className="flex-1" />

            {/* Danger Zone */}
            <Divider />
            <SectionLabel>Danger Zone</SectionLabel>
            <DangerButton onClick={handleDeleteColumn} loading={isDeleting}>
                Delete Column
            </DangerButton>
        </div>
    );
}
