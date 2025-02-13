import { fetchWithErrorHandling } from "../api/hander";
import {
    OrderResponse,
    OrderStatusRequest,
    OrderStatusResponse
} from "./definitions";

const ordersApi = process.env.NEXT_PUBLIC_ORDERS_API!;

export const getOrdersByStatusURL = (status: string, limit: number = 1, offset: number = 0) =>
    `${ordersApi}/orders/${status}?limit=${limit}&offset=${offset}`;

export async function createOrder() {
    return fetchWithErrorHandling(`${ordersApi}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer: "restaurant" })
    });
}

export async function fetchOrders(limit: number, offset: number): Promise<OrderResponse> {
    return fetchWithErrorHandling<OrderResponse>(`${ordersApi}/orders?limit=${limit}&offset=${offset}`);
}

export async function getOrdersByStatus({ status, limit, offset }: OrderStatusRequest): Promise<OrderStatusResponse> {
    return fetchWithErrorHandling<OrderStatusResponse>(getOrdersByStatusURL(status, limit, offset));
}
