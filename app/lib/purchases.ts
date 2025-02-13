import { fetchWithErrorHandling } from "../api/hander";
import { PurchaseResponse } from "./definitions";

const INVENTORY_API = process.env.NEXT_PUBLIC_INVENTORY_API!;

export const getPurchasesURL = (limit: number = 4, offset: number = 0) =>
    `${INVENTORY_API}/purchases?limit=${limit}&offset=${offset}`;

export async function getPurchases(limit: number, offset: number): Promise<PurchaseResponse> {
    return fetchWithErrorHandling<PurchaseResponse>(getPurchasesURL(limit, offset));
}
