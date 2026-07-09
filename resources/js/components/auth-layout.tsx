import React from "react";
import { Layers, Database, Sparkles, Zap } from "lucide-react";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {

    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 font-sans bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
            <div className="hidden lg:flex flex-col justify-between p-12 bg-zinc-950 text-white relative overflow-hidden border-r border-zinc-800">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zinc-800/40 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white text-zinc-950 flex items-center justify-center font-bold shadow-md">
                        <Layers className="w-5 h-5" />
                    </div>
                    <span className="font-bold tracking-tight text-lg">
                        ERD Designer AI
                    </span>
                </div>

                <div className="relative z-10 my-auto max-w-md space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300">
                            <Sparkles className="w-3.5 h-3.5 text-zinc-100" />
                            <span>Next-Gen Database Modeling</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight leading-snug">
                            Architect complex database schemas effortlessly.
                        </h2>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Visualize entity relationships, generate SQL definitions, and collaborate in real-time with state-of-the-art AI design tools.
                        </p>
                    </div>

                    {/* Feature Highlights Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
                            <Database className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-xs font-semibold text-zinc-200">
                                    Smart Schemas
                                </h4>
                                <p className="text-[11px] text-zinc-400 mt-0.5">
                                    Instant relationship mapping and validation.
                                </p>
                            </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
                            <Zap className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-xs font-semibold text-zinc-200">
                                    AI Powered
                                </h4>
                                <p className="text-[11px] text-zinc-400 mt-0.5">
                                    Generate tables and columns from text prompts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer / Testimonial */}
                <div className="relative z-10 pt-8 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-500">
                    <span>© {new Date().getFullYear()} ERD Designer AI</span>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative bg-white dark:bg-zinc-950">
                <div className="flex lg:hidden items-center gap-2.5 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold shadow-sm">
                        <Layers className="w-4 h-4" />
                    </div>
                    <span className="font-semibold tracking-tight text-base">
                        ERD Designer AI
                    </span>
                </div>

                {/* Form Container */}
                <div className="w-full max-w-[380px] space-y-6">
                    <div className="space-y-1.5 text-center sm:text-left">
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            {title}
                        </h1>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {subtitle}
                        </p>
                    </div>

                    <div className="pt-1">{children}</div>
                </div>
            </div>
        </div>
    );
}
