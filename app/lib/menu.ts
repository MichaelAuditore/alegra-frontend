import { fetchWithErrorHandling } from "../api/handler";
import { Recipe } from "./definitions";

const KITCHEN_API = process.env.KITCHEN_API!;

export async function getMenuRecipes(): Promise<Recipe[]> {
    const RECIPES_URL = `${KITCHEN_API}/recipes`;
    const data = await fetchWithErrorHandling<{ recipes: Recipe[] }>(RECIPES_URL);
    return data.recipes;
}
