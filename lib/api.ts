import {Area, AreaResponse, Category, CategoryResponse, Meal, MealResponse} from "@/types/meal";

export async function searchMeals(query: string): Promise<Meal[]> {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`, { method: 'GET' });

    if (!response.ok) return [];

    const data: MealResponse = await response.json();
    return data.meals ?? [];
}

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`/api/categories`, { method: 'GET' });

    if (!response.ok) return [];

    const data: CategoryResponse = await response.json();
    return data.categories ?? [];
}

export async function getAreas(): Promise<Area[]> {
    const response = await fetch(`/api/areas`, { method: 'GET' });

    if (!response.ok) return [];

    const data: AreaResponse = await response.json();
    return data.meals ?? [];
}