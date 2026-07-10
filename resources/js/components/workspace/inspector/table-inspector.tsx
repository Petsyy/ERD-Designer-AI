import React, { useState, useEffect } from "react";
import { Database, Plus, Loader2 } from "lucide-react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { SectionLabel, FieldRow, FieldInput, DangerButton, Divider, DATA_TYPE_OPTIONS } from "./inspector";

export default function TableInspector() {
    const { selectedTable, updateTable, deleteTable, addColumn, selectColumn } = useWorkspace();
    if (!selectedTable) return null;

    const [tableName, setTableName] = useState(selectedTable.name);
    const [tableNote, setTableNote] = useState(selectedTable.note || "");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAddingCol, setIsAddingCol] = useState(false);
    const [newColName, setNewColName] = useState("");
    const [newColType, setNewColType] = useState("VARCHAR(255)");
    const [newColIsPk, setNewColIsPk] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const columns = selectedTable.diagram_columns || selectedTable.diagramColumns || [];

    useEffect(() => {
        setTableName(selectedTable.name);
        setTableNote(selectedTable.note || "");
        setIsAddingCol(false);
        setNewColName("");
    }, [selectedTable.id]);

    const handleNameBlur = () => {
        if (tableName.trim() && tableName !== selectedTable.name) {
            updateTable(selectedTable.id, { name: tableName.trim() } as any);
        }
    };

    const handleNoteBlur = () => {
        if (tableNote !== (selectedTable.note || "")) {
            updateTable(selectedTable.id, { note: tableNote } as any);
        }
    };

    const handleDeleteTable = async () => {
        if (!confirm(`Delete table "${selectedTable.name}"? This cannot be undone.`)) return;
        setIsDeleting(true);
        await deleteTable(selectedTable.id);
    };

    const handleAddColumn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newColName.trim()) return;
        setIsSubmitting(true);
        const success = await addColumn(selectedTable.id, {
            name: newColName.trim(),
            data_type: newColType,
            is_primary: newColIsPk,
        });
        if (success) {
            setNewColName("");
            setNewColIsPk(false);
            setIsAddingCol(false);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2 bg-zinc-50/50 dark:bg-zinc-900/10">
                <Database className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    Table
                </span>
            </div>

            {/* General */}
            <SectionLabel>General</SectionLabel>
            <FieldRow label="Name">
                <FieldInput value={tableName} onChange={setTableName} placeholder="table_name" mono onBlur={handleNameBlur} />
            </FieldRow>
            <FieldRow label="Description">
                <textarea
                    value={tableNote}
                    onChange={(e) => setTableNote(e.target.value)}
                    onBlur={handleNoteBlur}
                    placeholder="Add a description..."
                    rows={2}
                    className="w-full px-2 py-1 text-[11px] rounded-md border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-955 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 resize-none font-sans"
                />
            </FieldRow>

            <Divider />

            {/* Columns */}
            <SectionLabel>Columns</SectionLabel>
            <div className="px-4 space-y-0.5">
                {columns.map((col) => (
                    <button
                        key={col.id}
                        type="button"
                        onClick={() => selectColumn(selectedTable.id, col.id)}
                        className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[11px] hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-colors group"
                    >
                        <div className="flex items-center gap-1.5 truncate">
                            {col.is_primary && (
                                <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                                    PK
                                </span>
                            )}
                            {col.is_foreign && !col.is_primary && (
                                <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border border-zinc-400 dark:border-zinc-650 text-zinc-500">
                                    FK
                                </span>
                            )}
                            <span className="font-mono font-medium text-zinc-850 dark:text-zinc-200 truncate">
                                {col.name}
                            </span>
                        </div>
                        <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase shrink-0">
                            {col.data_type}
                        </span>
                    </button>
                ))}
            </div>

            {/* Add Column */}
            <div className="px-4 py-2">
                {isAddingCol ? (
                    <form onSubmit={handleAddColumn} className="space-y-1.5">
                        <input
                            type="text"
                            value={newColName}
                            onChange={(e) => setNewColName(e.target.value)}
                            placeholder="column_name"
                            autoFocus
                            className="w-full px-2 py-1 text-[11px] font-mono rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                        />
                        <div className="flex items-center gap-1.5">
                            <select
                                value={newColType}
                                onChange={(e) => setNewColType(e.target.value)}
                                className="flex-1 px-1.5 py-1 text-[10px] font-mono rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                            >
                                {DATA_TYPE_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                            <label className="flex items-center gap-1 text-[10px] text-zinc-550 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={newColIsPk}
                                    onChange={(e) => setNewColIsPk(e.target.checked)}
                                    className="rounded border-zinc-300 dark:border-zinc-700"
                                />
                                PK
                            </label>
                        </div>
                        <div className="flex justify-end gap-1.5">
                            <button
                                type="button"
                                onClick={() => setIsAddingCol(false)}
                                className="px-2 py-1 text-[10px] rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !newColName.trim()}
                                className="px-2 py-1 text-[10px] font-medium rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 flex items-center gap-1"
                            >
                                {isSubmitting && <Loader2 className="w-2.5 h-2.5 animate-spin" />}
                                Add
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsAddingCol(true)}
                        className="w-full py-1.5 text-[11px] font-medium rounded-md border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-650 flex items-center justify-center gap-1 transition-colors bg-zinc-50/20 dark:bg-zinc-900/10"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Add Column
                    </button>
                )}
            </div>

            <div className="flex-1" />

            {/* Danger Zone */}
            <Divider />
            <SectionLabel>Danger Zone</SectionLabel>
            <DangerButton onClick={handleDeleteTable} loading={isDeleting}>
                Delete Table
            </DangerButton>
        </div>
    );
}
