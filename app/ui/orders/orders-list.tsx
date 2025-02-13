"use client";

import { Order } from "@/app/lib/definitions";
import { fetchOrders } from "@/app/lib/orders";
import { useEffect, useState } from "react";
import Paginator from "../paginator";
import { OrdersContent } from "./orders-content";
import { OrderItemSkeleton } from "../skeletons/order-card";
import { useTranslations } from "next-intl";

const ORDERS_PER_PAGE = 3;

export default function OrdersList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalOrders, setTotalOrders] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const t = useTranslations("Orders");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { orders = [], total } = await fetchOrders(
                    ORDERS_PER_PAGE,
                    (currentPage - 1) * ORDERS_PER_PAGE
                );
                setOrders(orders);
                setTotalOrders(total);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const totalPages = totalOrders !== null ? Math.ceil(totalOrders / ORDERS_PER_PAGE) : 1;

    return (
        <div className="mt-2 p-4 bg-white shadow-lg rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📦</h2>

            {isLoading ? (
                <div className="grid gap-4">
                    {Array.from({ length: ORDERS_PER_PAGE }).map((_, index) => (
                        <OrderItemSkeleton key={index} />
                    ))}
                </div>
            ) : (
                orders.length === 0 ? (
                    <p className="text-gray-600">{t("noOrders")}</p>
                ) : (
                    <OrdersContent orders={orders} />
                )
            )}

            {totalOrders !== null && totalPages > 0 ? (
                <Paginator
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => !isLoading && setCurrentPage(page)}
                />
            ) : null}
        </div>
    );
}
