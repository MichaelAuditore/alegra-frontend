"use client";

import { OrderStatusResponse, OrderStatusType } from "@/app/lib/definitions";
import { getOrdersByStatus } from "@/app/lib/orders";
import Paginator from "@/app/ui/paginator";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";
import useSWR from "swr";
import { OrderCardSkeleton } from "../skeletons/order-card";
import OrderCard from "./order-status-card";

const ORDERS_PER_PAGE = 1;

const getPollingInterval = (status: OrderStatusType) => {
    switch (status) {
        case "pending":
            return 5000;
        case "cooking":
            return 20000;
        case "ready":
            return 20000;
        default:
            return 1000;
    }
};

const fetcher = async (
    [status, limit, offset]: [OrderStatusType, number, number]
): Promise<OrderStatusResponse> => await getOrdersByStatus({ status, limit, offset });

export default function OrdersListByStatus({ status }: { status: OrderStatusType }) {
    const t = useTranslations("OrdersStatus");
    const [currentPage, setCurrentPage] = useState(1);
    const POLLING_INTERVAL = getPollingInterval(status);

    const {
        data = { orders: [], total: 0 },
        error,
        isLoading
    } = useSWR([
        status, ORDERS_PER_PAGE, ORDERS_PER_PAGE * (currentPage - 1)],
        fetcher, {
        refreshInterval: POLLING_INTERVAL,
    });

    if (error) return <p className="text-red-500">❌ {t("errorLoading")}</p>;

    return (
        <div className="flex flex-col gap-4 p-6 bg-gray-100 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {status === "pending" && `⏳ ${t("states.pending")}`}
                {status === "cooking" && `🔥 ${t("states.cooking")}`}
                {status === "ready" && `✅ ${t("states.ready")}`}
                {status === "unknown" && `❓ ${t("states.unknown")}`}
            </h2>

            {isLoading ? (
                <div className="flex flex-wrap gap-4 justify-center">
                    {Array.from({ length: ORDERS_PER_PAGE }).map((_, index) => (
                        <OrderCardSkeleton key={index} />
                    ))}
                </div>
            ) : data.orders.length > 0 ? (
                <Fragment>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {data?.orders.map((order) => (
                            <OrderCard key={order.order_id} order={order} />
                        ))}
                    </div>

                    {/* Paginador */}
                    <Paginator
                        totalPages={Math.ceil(data.total / ORDERS_PER_PAGE)}
                        currentPage={currentPage}
                        onPageChange={(page) => !isLoading && setCurrentPage(page)}
                    />
                </Fragment>
            ) : (
                <p className="text-gray-600">{t("noOrders")}</p>
            )}
        </div>
    );
}
