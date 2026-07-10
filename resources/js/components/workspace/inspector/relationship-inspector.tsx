import React, { useState } from "react";
import { Link2 } from "lucide-react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { SectionLabel, FieldRow, FieldSelect, DangerButton, Divider, ReadOnlyField, RELATIONSHIP_TYPE_OPTIONS, FK_ACTION_OPTIONS } from "./inspector";

export default function RelationshipInspector() {
    const { selectedRelationship, rawTables, updateRelationship, deleteRelationship } = useWorkspace();
    if (!selectedRelationship) return null;

    const [isDeleting, setIsDeleting] = useState(false);

    const sourceTable = rawTables.find((t) => t.id === selectedRelationship.source_table_id);
    const targetTable = rawTables.find((t) => t.id === selectedRelationship.target_table_id);
    const sourceColumn = sourceTable
        ? (sourceTable.diagram_columns || sourceTable.diagramColumns || []).find((c) => c.id === selectedRelationship.source_column_id)
        : null;
    const targetColumn = targetTable
        ? (targetTable.diagram_columns || targetTable.diagramColumns || []).find((c) => c.id === selectedRelationship.target_column_id)
        : null;

    const handleTypeChange = (val: string) => {
        updateRelationship(selectedRelationship.id, { relationship_type: val } as any);
    };

    const handleOnDeleteChange = (val: string) => {
        updateRelationship(selectedRelationship.id, { on_delete: val } as any);
    };

    const handleOnUpdateChange = (val: string) => {
        updateRelationship(selectedRelationship.id, { on_update: val } as any);
    };

    const handleDeleteRelationship = async () => {
        if (!confirm("Delete this relationship?")) return;
        setIsDeleting(true);
        await deleteRelationship(selectedRelationship.id);
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2 bg-zinc-50/50 dark:bg-zinc-900/10">
                <Link2 className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">
                    Relationship
                </span>
            </div>

            {/* Connection Info */}
            <SectionLabel>Connection</SectionLabel>
            <ReadOnlyField label="Source" value={sourceTable?.name || "—"} />
            <ReadOnlyField label="Column" value={sourceColumn?.name || "—"} />
            <div className="px-4 py-1">
                <div className="border-l-2 border-zinc-200 dark:border-zinc-850 h-3 ml-[50px]" />
            </div>
            <ReadOnlyField label="Target" value={targetTable?.name || "—"} />
            <ReadOnlyField label="Column" value={targetColumn?.name || "—"} />

            <Divider />

            {/* Settings */}
            <SectionLabel>Settings</SectionLabel>
            <FieldRow label="Type">
                <FieldSelect
                    value={selectedRelationship.relationship_type || "one_to_many"}
                    onChange={handleTypeChange}
                    options={RELATIONSHIP_TYPE_OPTIONS}
                />
            </FieldRow>
            <FieldRow label="On Delete">
                <FieldSelect
                    value={selectedRelationship.on_delete || "CASCADE"}
                    onChange={handleOnDeleteChange}
                    options={FK_ACTION_OPTIONS}
                />
            </FieldRow>
            <FieldRow label="On Update">
                <FieldSelect
                    value={selectedRelationship.on_update || "CASCADE"}
                    onChange={handleOnUpdateChange}
                    options={FK_ACTION_OPTIONS}
                />
            </FieldRow>

            <div className="flex-1" />

            {/* Danger Zone */}
            <Divider />
            <SectionLabel>Danger Zone</SectionLabel>
            <DangerButton onClick={handleDeleteRelationship} loading={isDeleting}>
                Delete Relationship
            </DangerButton>
        </div>
    );
}
