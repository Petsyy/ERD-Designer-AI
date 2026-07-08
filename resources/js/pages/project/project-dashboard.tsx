import React, { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { Plus, Search, Database, ArrowRight, Trash2, LogOut, Calendar, Layers, TableProperties,
} from "lucide-react";
import CreateProjectModal from "@/components/create-project-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface Project {
    id: number;
    name: string;
    description?: string;
    last_opened_at?: string;
    created_at?: string;
}

export default function ProjectDashboard({ projects = [] }: { projects: Project[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        localStorage.setItem("is_authenticated", "true");

        const handlePageShow = (event: PageTransitionEvent) => {
            if (event.persisted) {
                window.location.reload();
            }
        };

        window.addEventListener("pageshow", handlePageShow);
        return () => window.removeEventListener("pageshow", handlePageShow);
    }, []);

    const filteredProjects = projects.filter((p) => {
        const query = searchQuery.toLowerCase();
        return (
            p.name.toLowerCase().includes(query) ||
            (p.description && p.description.toLowerCase().includes(query))
        );
    });

    function handleDelete(e: React.MouseEvent, id: number, name: string) {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            router.delete(`/projects/${id}`);
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900">

            <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold">
                            <Layers className="w-4 h-4" />
                        </div>
                        <span className="font-semibold tracking-tight text-sm md:text-base">
                            ERD Designer AI
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            onClick={() => localStorage.removeItem("is_authenticated")}
                            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Sign Out</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-10">
                {/* Hero Section & Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-zinc-100 dark:border-zinc-900">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                            Projects
                        </h1>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            Design, structure, and visualize your database schemas.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Search Input */}
                        <div className="relative flex-1 sm:w-64">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600" />
                            <Input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-3 h-9 text-xs bg-zinc-50 dark:bg-zinc-900/50"
                            />
                        </div>

                        {/* New Project Button */}
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            size="sm"
                            className="h-9 gap-2 text-xs font-medium shrink-0 shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            <span>New Project</span>
                        </Button>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="mt-8">
                    {filteredProjects.length === 0 ? (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20">
                            <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 dark:text-zinc-600 mb-4">
                                <Database className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                {searchQuery
                                    ? "No matching projects found"
                                    : "No projects yet"}
                            </h3>
                            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
                                {searchQuery
                                    ? "Try adjusting your search terms to find what you're looking for."
                                    : "Create your first entity relationship diagram and start mapping out your architecture."}
                            </p>
                            {!searchQuery && (
                                <Button
                                    onClick={() => setIsModalOpen(true)}
                                    size="sm"
                                    className="mt-6 gap-2 text-xs font-medium shadow-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create First Project
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProjects.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/workspace/${project.id}`}
                                    className="group block transition-all duration-200"
                                >
                                    <Card className="flex flex-col justify-between h-full hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 shadow-2xs hover:shadow-md">
                                        <CardHeader className="p-5 pb-2">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900 transition-colors">
                                                        <TableProperties className="w-4 h-4" />
                                                    </div>
                                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate max-w-[180px] sm:max-w-[200px]">
                                                        {project.name}
                                                    </h3>
                                                </div>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) =>
                                                        handleDelete(
                                                            e,
                                                            project.id,
                                                            project.name
                                                        )
                                                    }
                                                    title="Delete project"
                                                    className="w-7 h-7 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="p-5 pt-2 pb-4 flex-1">
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 min-h-[2rem]">
                                                {project.description ||
                                                    "No description provided for this project."}
                                            </p>
                                        </CardContent>

                                        <CardFooter className="p-5 pt-3 border-t border-zinc-100 dark:border-zinc-900/80 flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500">
                                            <span className="inline-flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3" />
                                                {project.last_opened_at
                                                    ? new Date(
                                                          project.last_opened_at
                                                      ).toLocaleDateString(
                                                          undefined,
                                                          {
                                                              month: "short",
                                                              day: "numeric",
                                                          }
                                                      )
                                                    : "Recently"}
                                            </span>

                                            <span className="inline-flex items-center gap-1 font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                                                Open Canvas
                                                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                                            </span>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Separated Create Project Modal Component */}
            <CreateProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
