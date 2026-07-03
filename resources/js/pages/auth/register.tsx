import React from "react";
import { useForm, Link } from "@inertiajs/react";
import AuthLayout from "../../components/auth-layout";

export default function Register() {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post("/register", {
            onSuccess: () => {
                setData("password", "");
                setData("password_confirmation", "");
            },
        });
    }

    return (
        <AuthLayout
            title="Create account"
            subtitle="Sign up to start building database schemas"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name Field */}
                <div className="space-y-1.5">
                    <label
                        htmlFor="name"
                        className="block text-xs font-medium text-zinc-500 dark:text-zinc-400"
                    >
                        Full Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        placeholder="Peter"
                        className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-0 dark:border-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100 transition-colors"
                    />
                    {errors.name && (
                        <p className="text-xs font-medium text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                    <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400"
                    >
                        Email Address
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
                        placeholder="At least 8 characters"
                        className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-0 dark:border-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100 transition-colors"
                    />
                    {errors.password && (
                        <p className="text-xs font-medium text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1.5">
                    <label
                        htmlFor="password_confirmation"
                        className="block text-xs font-medium text-zinc-500 dark:text-zinc-400"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                        placeholder="Repeat password"
                        className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-0 dark:border-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100 transition-colors"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-2 flex items-center justify-center rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
                >
                    {processing ? "Creating account..." : "Create account"}
                </button>
            </form>

            {/* Navigation link */}
            <div className="mt-6 text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
