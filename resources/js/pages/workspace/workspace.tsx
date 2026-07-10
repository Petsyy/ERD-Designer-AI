import { useState } from "react";
import { Project, DiagramTable } from "@/types/workspace";
import { WorkspaceProvider, useWorkspace } from "@/contexts/WorkspaceContext";
import ProjectHeader from "@/components/workspace/toolbar/project-header";
import Canvas from "@/components/workspace/canvas/canvas";
import Inspector from "@/components/workspace/inspector/inspector";
import AddTableModal from "@/components/workspace/add-table-modal";
import EmptyCanvasState from "@/components/workspace/empty-canvas-state";

interface WorkspaceProps {
    project: Project & {
        diagramTables?: DiagramTable[];
    };
}

export default function Workspace({ project }: WorkspaceProps) {
    return (
        <WorkspaceProvider project={project}>
            <WorkspaceLayout project={project} />
        </WorkspaceProvider>
    );
}

function WorkspaceLayout({ project }: WorkspaceProps) {
    const { rawTables } = useWorkspace();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [modalCoords, setModalCoords] = useState<{ x: number; y: number } | undefined>(undefined);

    const handleOpenAddModal = (coords?: { x: number; y: number }) => {
        setModalCoords(coords);
        setIsAddModalOpen(true);
    };

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-white dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
            <ProjectHeader
                projectName={project.name}
                tablesCount={rawTables.length}
                onOpenAddModal={() => handleOpenAddModal()}
            />

            <div className="flex flex-1 w-full h-full overflow-hidden">
                {/* Inspector Panel */}
                <div className="w-72 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-955">
                    <Inspector />
                </div>

                {/* Canvas */}
                <div className="flex-1 relative flex flex-col">
                    {rawTables.length === 0 && (
                        <EmptyCanvasState onOpenAddModal={() => handleOpenAddModal()} />
                    )}
                    <Canvas />
                </div>
            </div>

            {/* Add Table Dialog */}
            <AddTableModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                projectId={project.id}
                initialPosition={modalCoords}
            />
        </div>
    );
}
