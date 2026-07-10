import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Table, Database, Hash, FileText, LayoutGrid, Loader2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface AddTableModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: number;
    initialPosition?: { x: number; y: number };
}

const TABLE_ICONS = [
    { name: "Table", icon: Table, label: "Table" },
    { name: "Database", icon: Database, label: "Database" },
    { name: "Hash", icon: Hash, label: "Entity" },
    { name: "LayoutGrid", icon: LayoutGrid, label: "Grid" },
    { name: "FileText", icon: FileText, label: "Document" },
];

const MONOCHROME_PALETTE = [
    { name: "Solid Black", value: "#09090b", class: "bg-zinc-950 dark:bg-zinc-100 border-zinc-800 dark:border-zinc-200" },
    { name: "Charcoal", value: "#27272a", class: "bg-zinc-800 dark:bg-zinc-300 border-zinc-700 dark:border-zinc-400" },
    { name: "Zinc Slate", value: "#3f3f46", class: "bg-zinc-700 dark:bg-zinc-400 border-zinc-600 dark:border-zinc-500" },
    { name: "Cool Grey", value: "#52525b", class: "bg-zinc-600 dark:bg-zinc-500 border-zinc-500 dark:border-zinc-600" },
    { name: "Outline White", value: "#ffffff", class: "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700" },
];

export default function AddTableModal({
    isOpen,
    onClose,
    projectId,
    initialPosition,
}: AddTableModalProps) {
    const { data, setData, post, processing, clearErrors, errors, reset, transform, } = useForm({
        name: "",
        note: "",
        icon: "Table",
        color: "#09090b",
        position_x: 150,
        position_y: 150,
    });

    useEffect(() => {
        if (isOpen) {
            reset();
            clearErrors();
        }
    }, [isOpen]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const position_x = initialPosition?.x ?? Math.round(Math.random() * 300 + 150);
        const position_y = initialPosition?.y ?? Math.round(Math.random() * 250 + 150);

        transform((currentData) => ({
            ...currentData,
            position_x,
            position_y,
        }));

        post(`/workspace/${projectId}/tables`, {
            onSuccess: () => {
                reset();
                clearErrors();
                onClose();
            },
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md font-sans border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-xl">
                <DialogHeader className="flex flex-row items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 shrink-0">
                        <Table className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                        <DialogTitle className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                            Create New Table
                        </DialogTitle>
                        <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                            Add a new database entity to your minimalist canvas.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="table-name" className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                            Table Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="table-name"
                            placeholder="e.g. users, orders, order_items"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            autoFocus
                            className="text-sm font-mono border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                        />
                        {errors.name && (
                            <p className="text-xs font-medium text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                            Header Icon
                        </Label>
                        <div className="grid grid-cols-5 gap-2">
                            {TABLE_ICONS.map((item) => {
                                const IconComponent = item.icon;
                                const isSelected = data.icon === item.name;
                                return (
                                    <button
                                        key={item.name}
                                        type="button"
                                        onClick={() => setData("icon", item.name)}
                                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-md border text-xs gap-1 transition-all ${
                                            isSelected
                                                ? "border-zinc-900 dark:border-zinc-100 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium shadow-sm"
                                                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 bg-zinc-50 dark:bg-zinc-900/50"
                                        }`}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        <span className="text-[10px] truncate w-full text-center">
                                            {item.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                            Monochrome Theme
                        </Label>
                        <div className="flex items-center gap-2.5 pt-1">
                            {MONOCHROME_PALETTE.map((theme) => {
                                const isSelected = data.color === theme.value;
                                return (
                                    <button
                                        key={theme.name}
                                        type="button"
                                        title={theme.name}
                                        onClick={() => setData("color", theme.value)}
                                        className={`w-7 h-7 rounded-full border-2 transition-transform flex items-center justify-center ${theme.class} ${
                                            isSelected ? "scale-110 ring-2 ring-offset-2 ring-zinc-900 dark:ring-zinc-100" : "hover:scale-105 opacity-80"
                                        }`}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="table-note" className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                            Description / Notes <span className="text-zinc-400 font-normal">(Optional)</span>
                        </Label>
                        <Textarea
                            id="table-note"
                            rows={2}
                            placeholder="Add entity notes, indexes or indexing requirements..."
                            value={data.note}
                            onChange={(e) => setData("note", e.target.value)}
                            className="text-xs font-mono resize-none border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                        />
                    </div>

                    <DialogFooter className="pt-2 gap-2 sm:gap-0 border-t border-zinc-100 dark:border-zinc-900">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={processing}
                            className="text-xs border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing || !data.name.trim()}
                            className="text-xs gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-medium"
                        >
                            {processing ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <Plus className="w-3.5 h-3.5" />
                            )}
                            Create Table
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}