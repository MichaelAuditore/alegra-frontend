"use client";

import { getIngredientList } from "@/app/lib/ingredients";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment, useState } from "react";
import useSWR from "swr";
import Paginator from "../paginator";
import { IngredientSkeleton } from "../skeletons/ingredients";

const INGREDIENTS_PER_PAGE = 4;
const POLLING_INTERVAL = 20000;

const fetcher = async () => await getIngredientList();

export default function IngredientList() {
    const t = useTranslations("Inventory");
    const [currentPage, setCurrentPage] = useState(1);

    const { data: ingredients = [], error, isLoading } = useSWR("inventory", fetcher, {
        refreshInterval: POLLING_INTERVAL,
    });

    if (error) return <p className="text-red-500">❌ {t("errorLoading")}</p>;

    const totalPages = Math.ceil(ingredients.length / INGREDIENTS_PER_PAGE);
    const paginatedIngredients = ingredients.slice(
        (currentPage - 1) * INGREDIENTS_PER_PAGE,
        currentPage * INGREDIENTS_PER_PAGE
    );

    return (
        <div className="flex flex-col gap-4 p-6 bg-gray-100 rounded-lg shadow-md">
            {/* 📌 Título con Icono */}
            <div className="flex items-center gap-3 mb-4">
                <ClipboardDocumentListIcon className="w-8 h-8 text-green-600" />
                <h1 className="text-2xl font-bold text-gray-800">{t("title")}</h1>
            </div>

            {isLoading ? (
                <IngredientSkeleton />
            ) : (
                <Fragment>
                    {/* 🖼 Grid completamente responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white rounded-3xl shadow-xl">
                        {paginatedIngredients.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 shadow-lg bg-gray-50"
                            >
                                <Image
                                    src={item.image_url}
                                    alt={item.key_name}
                                    width={100}
                                    height={100}
                                    className="rounded-full border-4 border-green-400 object-cover"
                                />
                                <h3 className="text-lg font-bold mt-4 text-gray-700">{t(item.key_name)}</h3>
                                <p className="text-center text-gray-500 mt-1 text-sm">
                                    {t("stock")} <span className="font-semibold text-green-500">{item.stock}</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* 📌 Paginador */}
                    {totalPages > 1 && (
                        <Paginator
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </Fragment>
            )}
        </div>
    );
}
