import { fetchWithErrorHandling } from "../api/handler";
import { Ingredient } from "./definitions";

const INVENTORY_API = process.env.NEXT_PUBLIC_INVENTORY_API!;
export const inventoryURL = `${INVENTORY_API}/inventory`;

export async function getIngredientList(): Promise<Ingredient[]> {
    const data = await fetchWithErrorHandling<{ inventory: Ingredient[] }>(inventoryURL);
    return data.inventory;
}
