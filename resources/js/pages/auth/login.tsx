import React from "react";
import { useForm, Link } from "@inertiajs/react";
import AuthLayout from "../../components/auth-layout";

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post("/login", {
            onSuccess: () => {
                setData("password", "");
            },
        });
    }

    return (
        <AuthLayout
            title="Sign in"
            subtitle="Enter your credentials to access your dashboard"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-1.5">
                    <label
                        htmlFor="email"
                        className="block text-xs font-medium text-zinc-500 dark:text-zinc-400"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-0 dark:border-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100 transition-colors"
                    />
                    {errors.email && (
                        <p className="text-xs font-medium text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                    <label
                        htmlFor="password"
                        className="block text-xs font-medium text-zinc-500 dark:text-zinc-400"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-0 dark:border-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100 transition-colors"
                    />
                    {errors.password && (
                        <p className="text-xs font-medium text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                    <input
                        id="remember"
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                        className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:checked:bg-zinc-50"
                    />
                    <label
                        htmlFor="remember"
                        className="ml-2 text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer select-none"
                    >
                        Keep me signed in
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex items-center justify-center rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
                >
                    {processing ? "Signing in..." : "Sign in"}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
