import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { FolderPlus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface CreateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateProjectModal({
    isOpen,
    onClose,
}: CreateProjectModalProps) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: "",
        description: "",
    });

    useEffect(() => {
        if (isOpen) {
            reset();
            clearErrors();
        }
    }, [isOpen]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post("/projects", {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md font-sans">
                <DialogHeader className="flex flex-row items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shrink-0">
                        <FolderPlus className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                        <DialogTitle className="text-base font-semibold tracking-tight">
                            New Project
                        </DialogTitle>
                        <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                            Create a canvas for your database schema.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="project-name" className="text-xs font-medium">
                            Project Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="project-name"
                            type="text"
                            required
                            autoFocus
                            placeholder="e.g. E-Commerce Core DB"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="text-sm"
                        />
                        {errors.name && (
                            <p className="text-xs font-medium text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="project-desc" className="text-xs font-medium">
                            Description{" "}
                            <span className="text-zinc-400 dark:text-zinc-600 font-normal">
                                (Optional)
                            </span>
                        </Label>
                        <Textarea
                            id="project-desc"
                            rows={3}
                            placeholder="Briefly describe the purpose of this database architecture..."
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="text-sm resize-none"
                        />
                        {errors.description && (
                            <p className="text-xs font-medium text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="pt-2 gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={processing}
                            className="text-xs"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing || !data.name.trim()}
                            className="text-xs gap-2"
                        >
                            {processing && (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            )}
                            Create Project
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
