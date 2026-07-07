import React from "react";
import { useForm, Link } from "@inertiajs/react";
import { Loader2, ArrowRight } from "lucide-react";
import AuthLayout from "../../components/auth-layout";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post("/login", {
            replace: true,
            onSuccess: () => {
                localStorage.setItem("is_authenticated", "true");
                setData("password", "");
            },
        });
    }

    return (
        <AuthLayout
            title="Sign In"
            subtitle="Enter your credentials to access your workspace"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        autoFocus
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
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                            Password
                        </Label>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required
                        placeholder="Enter your password"
                        className="h-9 text-xs"
                    />
                    {errors.password && (
                        <p className="text-[11px] font-medium text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2 pt-1">
                    <Checkbox
                        id="remember"
                        checked={data.remember}
                        onCheckedChange={(checked) =>
                            setData("remember", checked === true)
                        }
                    />
                    <Label
                        htmlFor="remember"
                        className="text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer font-normal leading-none"
                    >
                        Remember me
                    </Label>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full h-9 mt-2 text-xs font-medium gap-2 shadow-sm"
                >
                    {processing && (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    )}
                    <span>{processing ? "Signing in..." : "Sign in"}</span>
                    {!processing && <ArrowRight className="w-3.5 h-3.5" />}
                </Button>
            </form>

            <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-900 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-2">
                <span>Don't have an account?</span>
                <Link
                    href="/register"
                    className="font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
                >
                    Create account &rarr;
                </Link>
            </div>
        </AuthLayout>
    );
}
