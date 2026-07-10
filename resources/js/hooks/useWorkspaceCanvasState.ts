import { useCallback, useMemo, useEffect } from "react";
import { useNodesState, useEdgesState, addEdge, Connection, Node, Edge, NodeTypes } from "@xyflow/react";
import axios from "axios";
import { router } from "@inertiajs/react";
import { Project, DiagramTable, Relationship } from "../types/workspace";
import TableCard from "../components/workspace/tables/table-card";
import RelationshipLayer from "../components/workspace/canvas/relationship-layer";

interface UseWorkspaceCanvasStateProps {
    project: Project;
    rawTables: DiagramTable[];
    rawRelationships: Relationship[];
    selectedTableId: number | null;
    selectedColumnId: number | null;
    selectedEdgeId: string | null;
    selectTable: (id: number) => void;
    selectEdge: (edgeId: string) => void;
    clearSelection: () => void;
}

export function useWorkspaceCanvasState({
    project,
    rawTables,
    rawRelationships,
    selectedTableId,
    selectedColumnId,
    selectedEdgeId,
    selectTable,
    selectEdge,
    clearSelection,
}: UseWorkspaceCanvasStateProps) {
    const nodeTypes: NodeTypes = useMemo(() => ({ diagramTable: TableCard as any }), []);
    const edgeTypes: any = useMemo(() => ({ relationship: RelationshipLayer as any }), []);

    const getNodesFromTables = useCallback(() => {
        const fkColumnIds = new Set(
            rawRelationships.map((r: Relationship) => r.target_column_id).filter(Boolean)
        );
        return rawTables.map((t: DiagramTable) => {
            const cols = (t.diagram_columns || t.diagramColumns || []).map((c) => ({
                ...c,
                is_foreign: Boolean(c.is_foreign || fkColumnIds.has(c.id)),
            }));
            return {
                id: String(t.id),
                type: "diagramTable",
                position: { x: Number(t.position_x ?? 100), y: Number(t.position_y ?? 100) },
                data: {
                    ...t,
                    diagram_columns: cols,
                    diagramColumns: cols,
                    _selectedColumnId: selectedTableId === t.id ? selectedColumnId : null,
                    _isSelected: selectedTableId === t.id,
                } as unknown as Record<string, unknown>,
            };
        });
    }, [rawTables, rawRelationships, selectedTableId, selectedColumnId]);

    const getEdgesFromRelationships = useCallback(() => {
        return rawRelationships.map((r: Relationship) => {
            const sourceTable = rawTables.find((t: DiagramTable) => t.id === r.source_table_id);
            const targetTable = rawTables.find((t: DiagramTable) => t.id === r.target_table_id);

            let sourceHandle = r.source_column_id ? `col-${r.source_column_id}-source` : `table-${r.source_table_id}-right`;
            let targetHandle = r.target_column_id ? `col-${r.target_column_id}-target` : `table-${r.target_table_id}-left`;

            if (sourceTable && targetTable && sourceTable.position_x > targetTable.position_x) {
                if (r.source_column_id) sourceHandle = `col-${r.source_column_id}-left-source`;
                else sourceHandle = `table-${r.source_table_id}-left`;

                if (r.target_column_id) targetHandle = `col-${r.target_column_id}-right-target`;
                else targetHandle = `table-${r.target_table_id}-right`;
            }

            const edgeId = `rel-${r.id}`;
            return {
                id: edgeId,
                source: String(r.source_table_id),
                target: String(r.target_table_id),
                sourceHandle,
                targetHandle,
                type: "relationship",
                animated: false,
                selected: selectedEdgeId === edgeId,
                data: {
                    id: r.id,
                    project_id: project.id,
                    relationship_type: r.relationship_type || "one_to_many",
                    _isSelected: selectedEdgeId === edgeId,
                },
                style: {
                    stroke: selectedEdgeId === edgeId ? "#18181b" : "#a1a1aa",
                    strokeWidth: selectedEdgeId === edgeId ? 2.5 : 1.5,
                },
            };
        });
    }, [rawRelationships, rawTables, project.id, selectedEdgeId]);

    const [nodes, setNodes, onNodesChange] = useNodesState(getNodesFromTables());
    const [edges, setEdges, onEdgesChange] = useEdgesState(getEdgesFromRelationships());

    useEffect(() => {
        setNodes(getNodesFromTables());
    }, [rawTables, getNodesFromTables, setNodes]);

    useEffect(() => {
        setEdges(getEdgesFromRelationships());
    }, [rawRelationships, getEdgesFromRelationships, setEdges]);

    const onNodeDragStop = useCallback(
        async (_event: unknown, node: Node) => {
            const tableData = node.data as unknown as DiagramTable;
            try {
                await axios.put(`/workspace/tables/${node.id}`, {
                    name: tableData.name,
                    color: tableData.color,
                    icon: tableData.icon,
                    note: tableData.note,
                    position_x: Math.round(node.position.x),
                    position_y: Math.round(node.position.y),
                });
            } catch (err) {
                console.error("Failed to save position:", err);
            }
        },
        []
    );

    const onConnect = useCallback(
        async (connection: Connection) => {
            if (!connection.source || !connection.target) return;
            if (connection.source === connection.target && connection.sourceHandle === connection.targetHandle) return;

            const sourceColMatch = connection.sourceHandle?.match(/col-(\d+)-/);
            const targetColMatch = connection.targetHandle?.match(/col-(\d+)-/);

            let sourceColId = sourceColMatch ? Number(sourceColMatch[1]) : undefined;
            let targetColId = targetColMatch ? Number(targetColMatch[1]) : undefined;

            const sourceTable = rawTables.find((t: DiagramTable) => String(t.id) === String(connection.source));
            const targetTable = rawTables.find((t: DiagramTable) => String(t.id) === String(connection.target));

            if (!sourceTable || !targetTable) return;

            if (!sourceColId || !targetColId) {
                const sourceCols = sourceTable.diagram_columns || sourceTable.diagramColumns || [];
                const targetCols = targetTable.diagram_columns || targetTable.diagramColumns || [];

                if (sourceCols.length === 0 || targetCols.length === 0) return;

                if (!sourceColId) {
                    const pk = sourceCols.find((c) => c.is_primary);
                    sourceColId = pk ? pk.id : sourceCols[0].id;
                }

                if (!targetColId) {
                    const fk = targetCols.find((c) => c.is_foreign);
                    const matchingId = targetCols.find(
                        (c) =>
                            c.name.toLowerCase() === `${sourceTable.name.toLowerCase()}_id` ||
                            c.name.toLowerCase() === `${sourceTable.name.toLowerCase().replace(/s$/, "")}_id`
                    );
                    const nonPk = targetCols.find((c) => !c.is_primary);
                    targetColId = fk ? fk.id : matchingId ? matchingId.id : nonPk ? nonPk.id : targetCols[0].id;
                }
            }

            if (sourceColId === targetColId) return;

            if (targetColId) {
                setNodes((nds) =>
                    nds.map((n) => {
                        if (String(n.id) === String(connection.target)) {
                            const td = n.data as unknown as DiagramTable;
                            const cols = (td.diagram_columns || td.diagramColumns || []).map((c) =>
                                c.id === targetColId ? { ...c, is_foreign: true } : c
                            );
                            return { ...n, data: { ...td, diagram_columns: cols, diagramColumns: cols } as Record<string, unknown> };
                        }
                        return n;
                    })
                );
            }

            setEdges((eds) =>
                addEdge(
                    {
                        ...connection,
                        type: "relationship",
                        animated: false,
                        data: {
                            project_id: project.id, relationship_type: "one_to_many",
                            id: 0,
                            _isSelected: false
                        },
                        style: { stroke: "#a1a1aa", strokeWidth: 1.5 },
                    },
                    eds
                )
            );

            try {
                await axios.post(`/workspace/${project.id}/relationships`, {
                    source_table_id: Number(connection.source),
                    source_column_id: sourceColId,
                    target_table_id: Number(connection.target),
                    target_column_id: targetColId,
                    relationship_type: "one_to_many",
                });
                router.reload({ only: ["project"] });
            } catch (err) {
                console.error("Failed to save relationship:", err);
                router.reload({ only: ["project"] });
            }
        },
        [project.id, rawTables, setEdges, setNodes]
    );

    const onNodeClick = useCallback(
        (_event: React.MouseEvent, node: Node) => {
            selectTable(Number(node.id));
        },
        [selectTable]
    );

    const onEdgeClick = useCallback(
        (_event: React.MouseEvent, edge: Edge) => {
            selectEdge(edge.id);
        },
        [selectEdge]
    );

    const onPaneClick = useCallback(() => {
        clearSelection();
    }, [clearSelection]);

    return {
        nodes,
        edges,
        nodeTypes,
        edgeTypes,
        onNodesChange,
        onEdgesChange,
        onNodeDragStop,
        onConnect,
        onNodeClick,
        onEdgeClick,
        onPaneClick,
    };
}
export type UseWorkspaceCanvasStateType = ReturnType<typeof useWorkspaceCanvasState>;
