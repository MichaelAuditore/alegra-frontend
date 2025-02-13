"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/restaurant";
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations("Login");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl,
        });

        setIsLoading(false);

        if (result?.error) {
            setError("Invalid email or password");
        } else if (result?.ok) {
            window.location.href = callbackUrl; // Redirect on success
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-lg p-8 max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 text-center flex items-center justify-center">
                {t("title")}
            </h2>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t("email")}
                </label>
                <div className="relative mt-1">
                    <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder={t("placeholderEmail")}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    {t("password")}
                </label>
                <div className="relative mt-1">
                    <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={6}
                        placeholder={t("placeholderPassword")}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Login Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
            >
                {isLoading ? t("signingIn") : t("signIn")}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>

            {/* Error Message */}
            {error && (
                <div className="flex items-center text-red-500 text-sm mt-2">
                    <ExclamationCircleIcon className="h-5 w-5 mr-1" />
                    {error}
                </div>
            )}
        </form>
    );
}
