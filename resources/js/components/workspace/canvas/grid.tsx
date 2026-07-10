import { Background, BackgroundVariant } from "@xyflow/react";

export default function Grid() {
    return (
        <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#d4d4d8"
            className="opacity-50 dark:opacity-15"
        />
    );
}
