import { useState, useMemo, useCallback } from "react";
import { DiagramTable, Relationship } from "../types/workspace";

export function useWorkspaceSelection(rawTables: DiagramTable[], rawRelationships: Relationship[]) {
    const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
    const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);
    const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

    const selectedTable = useMemo(() => {
        if (!selectedTableId) return null;
        return rawTables.find((t) => t.id === selectedTableId) || null;
    }, [selectedTableId, rawTables]);

    const selectedColumn = useMemo(() => {
        if (!selectedColumnId || !selectedTable) return null;
        const cols = selectedTable.diagram_columns || selectedTable.diagramColumns || [];
        return cols.find((c) => c.id === selectedColumnId) || null;
    }, [selectedColumnId, selectedTable]);

    const selectedRelationship = useMemo(() => {
        if (!selectedEdgeId) return null;
        const relId = selectedEdgeId.replace("rel-", "");
        return rawRelationships.find((r) => String(r.id) === relId) || null;
    }, [selectedEdgeId, rawRelationships]);

    const selectTable = useCallback((id: number) => {
        setSelectedTableId(id);
        setSelectedColumnId(null);
        setSelectedEdgeId(null);
    }, []);

    const selectColumn = useCallback((tableId: number, columnId: number) => {
        setSelectedTableId(tableId);
        setSelectedColumnId(columnId);
        setSelectedEdgeId(null);
    }, []);

    const selectEdge = useCallback((edgeId: string) => {
        setSelectedTableId(null);
        setSelectedColumnId(null);
        setSelectedEdgeId(edgeId);
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedTableId(null);
        setSelectedColumnId(null);
        setSelectedEdgeId(null);
    }, []);

    return {
        selectedTableId,
        selectedColumnId,
        selectedEdgeId,
        selectedTable,
        selectedColumn,
        selectedRelationship,
        selectTable,
        selectColumn,
        selectEdge,
        clearSelection,
    };
}
export type UseWorkspaceSelectionType = ReturnType<typeof useWorkspaceSelection>;
