import { useCallback } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
import { DiagramTable, DiagramColumn, Relationship } from "../types/workspace";

interface UseWorkspaceMutationsProps {
    projectId: number;
    clearSelection: () => void;
}

export function useWorkspaceMutations({ projectId, clearSelection }: UseWorkspaceMutationsProps) {
    const updateTable = useCallback(async (id: number, data: Partial<DiagramTable>) => {
        try {
            await axios.put(`/workspace/tables/${id}`, data);
            router.reload({ only: ["project"] });
        } catch (err) {
            console.error("Failed to update table:", err);
        }
    }, []);

    const deleteTable = useCallback(async (id: number) => {
        try {
            await axios.delete(`/workspace/tables/${id}`);
            clearSelection();
            router.reload({ only: ["project"] });
        } catch (err) {
            console.error("Failed to delete table:", err);
        }
    }, [clearSelection]);

    const addColumn = useCallback(async (tableId: number, data: { name: string; data_type: string; is_primary?: boolean }) => {
        try {
            await axios.post(`/workspace/tables/${tableId}/columns`, {
                ...data,
                is_nullable: !data.is_primary,
            });
            router.reload({ only: ["project"] });
            return true;
        } catch (err) {
            console.error("Failed to add column:", err);
            return false;
        }
    }, []);

    const updateColumn = useCallback(async (id: number, data: Partial<DiagramColumn>) => {
        try {
            await axios.put(`/workspace/columns/${id}`, data);
            router.reload({ only: ["project"] });
        } catch (err) {
            console.error("Failed to update column:", err);
        }
    }, []);

    const deleteColumn = useCallback(async (id: number) => {
        try {
            await axios.delete(`/workspace/columns/${id}`);
            clearSelection();
            router.reload({ only: ["project"] });
        } catch (err) {
            console.error("Failed to delete column:", err);
        }
    }, [clearSelection]);

    const updateRelationship = useCallback(async (id: number, data: Partial<Relationship>) => {
        try {
            await axios.put(`/workspace/${projectId}/relationships/${id}`, data);
            router.reload({ only: ["project"] });
        } catch (err) {
            console.error("Failed to update relationship:", err);
        }
    }, [projectId]);

    const deleteRelationship = useCallback(async (id: number) => {
        try {
            await axios.delete(`/workspace/${projectId}/relationships/${id}`);
            clearSelection();
            router.reload({ only: ["project"] });
        } catch (err) {
            console.error("Failed to delete relationship:", err);
        }
    }, [projectId, clearSelection]);

    return {
        updateTable,
        deleteTable,
        addColumn,
        updateColumn,
        deleteColumn,
        updateRelationship,
        deleteRelationship,
    };
}
export type UseWorkspaceMutationsType = ReturnType<typeof useWorkspaceMutations>;
