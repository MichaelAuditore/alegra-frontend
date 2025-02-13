"use client";

import { useTranslations } from "next-intl";

interface PaginatorProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Paginator({ totalPages, currentPage, onPageChange }: PaginatorProps) {
    const t = useTranslations("Paginator");
    return (
        <div className="flex justify-between items-center mt-6">
            <button
                className={`px-4 py-2 rounded-lg border ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ⬅️ {t("prev")}
            </button>

            <span className="text-gray-600">
                {t("page")}
                <br />
                {currentPage} / {totalPages}
            </span>

            <button
                className={`px-4 py-2 rounded-lg border ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {t("next")} ➡️
            </button>
        </div>
    );
}
