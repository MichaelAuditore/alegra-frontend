"use client";

import { getPurchases } from "@/app/lib/purchases";
import { useTimeZone, useTranslations } from "next-intl";
import { useState } from "react";
import useSWR from "swr";
import Paginator from "../paginator";
import PurchasesSkeleton from "../skeletons/purchases";

const ITEMS_PER_PAGE = 8;
const POLLING_INTERVAL = 30000;

const fetcher = async ([limit, offset]: [number, number]) => {
    const { purchases, total } = await getPurchases(limit, offset);
    return { purchases, total };
};

export default function PurchasesTable({ locale }: { locale: string }) {
    const t = useTranslations("Purchases");
    const [currentPage, setCurrentPage] = useState(1);
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const timeZone = useTimeZone();

    const { data, error, isLoading } = useSWR([ITEMS_PER_PAGE, offset], fetcher, {
        refreshInterval: POLLING_INTERVAL
    });

    // Handle the error scenario
    if (error) return <p className="text-red-500">❌ {t("errorLoading")}</p>;

    const purchases = data?.purchases || [];
    const totalPages = data?.total ? Math.max(1, Math.ceil(data.total / ITEMS_PER_PAGE)) : 1;

    return isLoading ? (
        <PurchasesSkeleton />
    ) : (
        <div className="col-span-2 bg-white shadow-lg rounded-lg p-4 overflow-auto">
            <div className="col-span-1 md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 {t("title")}</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-2 border">{t("headers.product")}</th>
                                <th className="px-4 py-2 border">{t("headers.purchasedStock")}</th>
                                <th className="px-4 py-2 border">{t("headers.purchasedDate")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((purchase, index) => (
                                <tr key={index} className="text-center border-t">
                                    <td className="px-4 py-2 border">{t(purchase.key_name)}</td>
                                    <td className="px-4 py-2 border">{purchase.purchasedStock}</td>
                                    <td className="px-4 py-2 border">
                                        {
                                            new Intl.DateTimeFormat(locale, {
                                                timeZone,
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                            }).format(new Date(purchase.purchasedDate))
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginator */}
                <Paginator
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)} // ✅ Directly set page
                />
            </div>
        </div>
    );
}
