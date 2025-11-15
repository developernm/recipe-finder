import {Meal, MealResponse} from "@/types/meal";

export async function searchMeals(query: string): Promise<Meal[]> {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`, { method: 'GET' });

    if (!response.ok) return [];

    const data: MealResponse = await response.json();
    return data.meals ?? [];
}