import { ReactFlow, Controls, ConnectionMode } from "@xyflow/react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import Grid from "./grid";
import SelectionLayer from "./selection-layer";

export default function Canvas() {
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onNodeDragStop,
        onConnect,
        onNodeClick,
        onEdgeClick,
        onPaneClick,
        nodeTypes,
        edgeTypes,
    } = useWorkspace();

    return (
        <div className="flex-1 w-full h-full relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeDragStop={onNodeDragStop}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onEdgeClick={onEdgeClick}
                onPaneClick={onPaneClick}
                connectionMode={ConnectionMode.Loose}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                fitViewOptions={{ padding: 0.3 }}
                minZoom={0.1}
                maxZoom={3}
                multiSelectionKeyCode="Shift"
                selectionKeyCode="Shift"
                proOptions={{ hideAttribution: true }}
                className="bg-white dark:bg-zinc-950"
            >
                <Grid />
                <Controls
                    position="bottom-left"
                    className="!bg-white dark:!bg-zinc-900 !border !border-zinc-200 dark:!border-zinc-800 !rounded-lg !shadow-xs !p-0.5 !gap-0.5 flex flex-col [&>button]:!bg-transparent [&>button]:!border-0 [&>button]:!text-zinc-500 dark:[&>button]:!text-zinc-400 hover:[&>button]:!bg-zinc-100 dark:hover:[&>button]:!bg-zinc-800 [&>button]:!rounded-md [&>button]:!w-7 [&>button]:!h-7 [&>button]:!flex [&>button]:!items-center [&>button]:!justify-center"
                />
                <SelectionLayer />
            </ReactFlow>
        </div>
    );
}
