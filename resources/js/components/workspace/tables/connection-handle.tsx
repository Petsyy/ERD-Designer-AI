import { Handle, HandleType, Position } from "@xyflow/react";

interface ConnectionHandleProps {
    type: HandleType;
    position: Position;
    id: string;
    className?: string;
}

export default function ConnectionHandle({ type, position, id, className = "" }: ConnectionHandleProps) {
    const isLeftOrRight = position === Position.Left || position === Position.Right;
    const sizeClasses = isLeftOrRight ? "!w-2.5 !h-2.5 -ml-1.5 group-hover:!opacity-100" : "!w-3 !h-1.5 group-hover/table:!opacity-60";

    return (
        <Handle
            type={type}
            position={position}
            id={id}
            className={`!opacity-0 !bg-zinc-900 dark:!bg-zinc-100 hover:!scale-125 transition-all duration-150 !border-2 !border-white dark:!border-zinc-950 !rounded-full z-20 cursor-crosshair ${sizeClasses} ${className}`}
        />
    );
}
