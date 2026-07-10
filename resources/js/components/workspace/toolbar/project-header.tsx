import { Layers } from "lucide-react";
import TableCounter from "./table-counter";
import AddTableButton from "./add-table-button";

interface ProjectHeaderProps {
    projectName: string;
    tablesCount: number;
    onOpenAddModal: () => void;
}

export default function ProjectHeader({
    projectName,
    tablesCount,
    onOpenAddModal,
}: ProjectHeaderProps) {
    return (
        <header className="flex items-center justify-between h-12 px-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0 bg-white dark:bg-zinc-950 z-20">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900">
                    <Layers className="w-3.5 h-3.5" />
                </div>
                <h1 className="text-[13px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {projectName}
                </h1>
            </div>

            <div className="flex items-center gap-2.5">
                <TableCounter count={tablesCount} />
                <AddTableButton onClick={onOpenAddModal} />
            </div>
        </header>
    );
}
