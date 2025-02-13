"use client";

import { Order } from "@/app/lib/definitions";
import { OrderItem } from "./order-item";
import { useTranslations } from "next-intl";

export function OrdersContent({ orders }: { orders: Order[] }) {
    const t = useTranslations("Orders");

    return (
        <ul className="space-y-3">
            {orders.map((order) => (
                <OrderItem key={order.id} order={order} t={t} />
            ))}
        </ul>
    );
}
