import { Plus } from "lucide-react";
import { Button } from "../../ui/button";

interface AddTableButtonProps {
    onClick: () => void;
}

export default function AddTableButton({ onClick }: AddTableButtonProps) {
    return (
        <Button
            onClick={onClick}
            className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-[11px] gap-1.5 font-medium px-3 py-1 h-7 rounded-md"
        >
            <Plus className="w-3.5 h-3.5" />
            Add Table
        </Button>
    );
}
