import React, { createContext, useContext } from "react";
import { Node, Edge, NodeTypes } from "@xyflow/react";
import { Project, DiagramTable, DiagramColumn, Relationship } from "../types/workspace";
import { useWorkspaceSelection } from "../hooks/useWorkspaceSelection";
import { useWorkspaceMutations } from "../hooks/useWorkspaceMutations";
import { useWorkspaceCanvasState } from "../hooks/useWorkspaceCanvasState";

// ─── Types ───────────────────────────────────────────────────────────────────

interface WorkspaceState {
    // Project data
    project: Project;
    rawTables: DiagramTable[];
    rawRelationships: Relationship[];

    // React Flow state
    nodes: Node[];
    edges: Edge[];
    nodeTypes: NodeTypes;
    edgeTypes: any;
    onNodesChange: any;
    onEdgesChange: any;

    // Selection state
    selectedTableId: number | null;
    selectedColumnId: number | null;
    selectedEdgeId: string | null;
    selectedTable: DiagramTable | null;
    selectedColumn: DiagramColumn | null;
    selectedRelationship: Relationship | null;

    // Selection actions
    selectTable: (id: number) => void;
    selectColumn: (tableId: number, columnId: number) => void;
    selectEdge: (edgeId: string) => void;
    clearSelection: () => void;

    // Canvas actions
    onNodeDragStop: (event: unknown, node: Node) => void;
    onConnect: (connection: any) => void;
    onNodeClick: (event: React.MouseEvent, node: Node) => void;
    onEdgeClick: (event: React.MouseEvent, edge: Edge) => void;
    onPaneClick: () => void;

    // Inspector API actions
    updateTable: (id: number, data: Partial<DiagramTable>) => Promise<void>;
    deleteTable: (id: number) => Promise<void>;
    addColumn: (tableId: number, data: { name: string; data_type: string; is_primary?: boolean }) => Promise<boolean>;
    updateColumn: (id: number, data: Partial<DiagramColumn>) => Promise<void>;
    deleteColumn: (id: number) => Promise<void>;
    updateRelationship: (id: number, data: Partial<Relationship>) => Promise<void>;
    deleteRelationship: (id: number) => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceState | null>(null);

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useWorkspace(): WorkspaceState {
    const ctx = useContext(WorkspaceContext);
    if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
    return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────────────

interface WorkspaceProviderProps {
    project: Project & { diagramTables?: DiagramTable[] };
    children: React.ReactNode;
}

export function WorkspaceProvider({ project, children }: WorkspaceProviderProps) {
    const rawTables = project.diagram_tables || project.diagramTables || [];
    const rawRelationships = project.relationships || [];

    // 1. Selection state and derived objects
    const selection = useWorkspaceSelection(rawTables, rawRelationships);

    // 2. mutations (CRUD API calls)
    const mutations = useWorkspaceMutations({
        projectId: project.id,
        clearSelection: selection.clearSelection,
    });

    // 3. React Flow Canvas state (nodes, edges, event handlers)
    const canvas = useWorkspaceCanvasState({
        project,
        rawTables,
        rawRelationships,
        selectedTableId: selection.selectedTableId,
        selectedColumnId: selection.selectedColumnId,
        selectedEdgeId: selection.selectedEdgeId,
        selectTable: selection.selectTable,
        selectEdge: selection.selectEdge,
        clearSelection: selection.clearSelection,
    });

    const value: WorkspaceState = {
        project,
        rawTables,
        rawRelationships,
        ...selection,
        ...mutations,
        ...canvas,
    };

    return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}
