import React from "react";
import { useForm, Link } from "@inertiajs/react";
import { Loader2, ArrowRight } from "lucide-react";
import AuthLayout from "@/components/auth-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
            replace: true,
            onSuccess: () => {
                setData("password", "");
                setData("password_confirmation", "");
            },
        });
    }

    return (
        <AuthLayout
            title="Create account"
            subtitle="Start designing database architectures in minutes"
        >
            <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name Field */}
                <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Full Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoFocus
                        placeholder="Enter your full name"
                        className="h-9 text-xs"
                    />
                    {errors.name && (
                        <p className="text-[11px] font-medium text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Email Address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        placeholder="Enter your email address"
                        className="h-9 text-xs"
                    />
                    {errors.email && (
                        <p className="text-[11px] font-medium text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required
                        placeholder="Create a password (min. 8 characters)"
                        className="h-9 text-xs"
                    />
                    {errors.password && (
                        <p className="text-[11px] font-medium text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1.5">
                    <Label
                        htmlFor="password_confirmation"
                        className="text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        Confirm Password
                    </Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                        placeholder="Confirm your password"
                        className="h-9 text-xs"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full h-9 mt-3 text-xs font-medium gap-2 shadow-sm"
                >
                    {processing && (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    )}
                    <span>{processing ? "Creating account..." : "Get Started"}</span>
                    {!processing && <ArrowRight className="w-3.5 h-3.5" />}
                </Button>
            </form>

            <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-900 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-2">
                <span>Already have an account?</span>
                <Link
                    href="/login"
                    className="font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
                >
                    Sign in &rarr;
                </Link>
            </div>
        </AuthLayout>
    );
}
