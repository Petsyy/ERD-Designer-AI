import React from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import TableInspector from "./table-inspector";
import ColumnInspector from "./column-inspector";
import RelationshipInspector from "./relationship-inspector";
import EmptyState from "./empty-state";

// ─── Export helper components for sub-inspectors ─────────────────────────────

export function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-4 pt-4 pb-1.5">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {children}
            </span>
        </div>
    );
}

export function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="px-4 py-1.5 flex items-center justify-between gap-3">
            <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 shrink-0 w-20">
                {label}
            </label>
            <div className="flex-1 min-w-0">{children}</div>
        </div>
    );
}

export function FieldInput({
    value,
    onChange,
    placeholder,
    mono = false,
    onBlur,
}: {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    mono?: boolean;
    onBlur?: () => void;
}) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`w-full px-2 py-1 text-[11px] rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-colors ${mono ? "font-mono" : ""}`}
        />
    );
}

export function FieldSelect({
    value,
    onChange,
    options,
}: {
    value: string;
    onChange: (val: string) => void;
    options: { label: string; value: string }[];
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-2 py-1 text-[11px] font-mono rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 appearance-none cursor-pointer"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}

export function FieldToggle({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (val: boolean) => void;
}) {
    return (
        <div className="px-4 py-1.5 flex items-center justify-between">
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative w-7 h-4 rounded-full transition-colors duration-200 ${
                    checked ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-800"
                }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white dark:bg-zinc-950 shadow-sm transition-transform duration-200 ${
                        checked ? "translate-x-3" : "translate-x-0"
                    }`}
                />
            </button>
        </div>
    );
}

export function DangerButton({
    onClick,
    loading,
    children,
}: {
    onClick: () => void;
    loading?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="px-4 py-3">
            <button
                type="button"
                onClick={onClick}
                disabled={loading}
                className="w-full px-3 py-1.5 text-[11px] font-medium rounded-md border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                {children}
            </button>
        </div>
    );
}

export function Divider() {
    return <div className="mx-4 border-t border-zinc-100 dark:border-zinc-900" />;
}

export function ReadOnlyField({ label, value }: { label: string; value: string }) {
    return (
        <div className="px-4 py-1.5 flex items-center justify-between gap-3">
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 shrink-0 w-20">
                {label}
            </span>
            <span className="text-[11px] font-mono text-zinc-700 dark:text-zinc-300 truncate">
                {value}
            </span>
        </div>
    );
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const DATA_TYPE_OPTIONS = [
    { label: "ID / BIGSERIAL", value: "ID" },
    { label: "VARCHAR(255)", value: "VARCHAR(255)" },
    { label: "INT", value: "INT" },
    { label: "BIGINT", value: "BIGINT" },
    { label: "TEXT", value: "TEXT" },
    { label: "BOOLEAN", value: "BOOLEAN" },
    { label: "TIMESTAMP", value: "TIMESTAMP" },
    { label: "DATE", value: "DATE" },
    { label: "UUID", value: "UUID" },
    { label: "JSONB", value: "JSONB" },
    { label: "DECIMAL", value: "DECIMAL" },
    { label: "FLOAT", value: "FLOAT" },
];

export const RELATIONSHIP_TYPE_OPTIONS = [
    { label: "One to One (1:1)", value: "one_to_one" },
    { label: "One to Many (1:N)", value: "one_to_many" },
    { label: "Many to One (N:1)", value: "many_to_one" },
    { label: "Many to Many (N:N)", value: "many_to_many" },
];

export const FK_ACTION_OPTIONS = [
    { label: "CASCADE", value: "CASCADE" },
    { label: "SET NULL", value: "SET NULL" },
    { label: "RESTRICT", value: "RESTRICT" },
    { label: "NO ACTION", value: "NO ACTION" },
    { label: "SET DEFAULT", value: "SET DEFAULT" },
];

// ─── Entry Point Inspector ───────────────────────────────────────────────────

export default function Inspector() {
    const { selectedTable, selectedColumn, selectedRelationship } = useWorkspace();

    if (selectedRelationship) {
        return <RelationshipInspector />;
    }
    if (selectedColumn && selectedTable) {
        return <ColumnInspector />;
    }
    if (selectedTable) {
        return <TableInspector />;
    }
    return <EmptyState />;
}
