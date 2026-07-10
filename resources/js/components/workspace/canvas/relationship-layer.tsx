import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath, Position } from "@xyflow/react";

const getMarkers = (type: string) => {
    switch (type) {
        case "one_to_one":
            return { source: "1", target: "1" };
        case "one_to_many":
            return { source: "1", target: "N" };
        case "many_to_one":
            return { source: "N", target: "1" };
        case "many_to_many":
            return { source: "N", target: "N" };
        default:
            return { source: "1", target: "N" };
    }
};

const getHandleOffset = (pos: Position = Position.Right) => {
    switch (pos) {
        case Position.Left:
            return { x: -18, y: 0 };
        case Position.Right:
            return { x: 18, y: 0 };
        case Position.Top:
            return { x: 0, y: -18 };
        case Position.Bottom:
            return { x: 0, y: 18 };
        default:
            return { x: 18, y: 0 };
    }
};

export default function RelationshipLayer({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
}: EdgeProps) {
    const relData = (data || {}) as {
        id?: number;
        project_id?: number;
        relationship_type?: string;
        _isSelected?: boolean;
    };

    const currentType = relData.relationship_type || "one_to_many";
    const markers = getMarkers(currentType);
    const isSelected = relData._isSelected || false;

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        curvature: 0.25,
    });

    const sourceOffset = getHandleOffset(sourcePosition);
    const targetOffset = getHandleOffset(targetPosition);

    const strokeColor = isSelected ? "#18181b" : "#a1a1aa";
    const strokeWidth = isSelected ? 2.5 : 1.5;

    return (
        <>
            <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
                <defs>
                    <marker
                        id={`circle-start-${id}`}
                        markerWidth="12"
                        markerHeight="12"
                        refX="6"
                        refY="6"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <circle cx="6" cy="6" r="3" fill={strokeColor} stroke={strokeColor} strokeWidth="1" />
                    </marker>
                    <marker
                        id={`circle-end-${id}`}
                        markerWidth="12"
                        markerHeight="12"
                        refX="6"
                        refY="6"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <circle cx="6" cy="6" r="3" fill="white" stroke={strokeColor} strokeWidth="1.5" />
                    </marker>
                </defs>
            </svg>

            <BaseEdge
                id={id}
                path={edgePath}
                markerStart={`url(#circle-start-${id})`}
                markerEnd={`url(#circle-end-${id})`}
                style={{
                    stroke: strokeColor,
                    strokeWidth,
                    ...style,
                }}
            />

            <EdgeLabelRenderer>
                <div className="pointer-events-none select-none">
                    <div
                        style={{
                            position: "absolute",
                            transform: `translate(-50%, -50%) translate(${sourceX + sourceOffset.x}px, ${sourceY + sourceOffset.y}px)`,
                        }}
                        className={`px-1 py-0.5 rounded text-[9px] font-mono font-bold leading-none ${
                            isSelected
                                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                                : "bg-white dark:bg-zinc-955 border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400"
                        }`}
                    >
                        {markers.source}
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            transform: `translate(-50%, -50%) translate(${targetX + targetOffset.x}px, ${targetY + targetOffset.y}px)`,
                        }}
                        className={`px-1 py-0.5 rounded text-[9px] font-mono font-bold leading-none ${
                            isSelected
                                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                                : "bg-white dark:bg-zinc-955 border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400"
                        }`}
                    >
                        {markers.target}
                    </div>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
