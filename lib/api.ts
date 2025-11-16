import {
  Area,
  AreaResponse,
  Category,
  CategoryResponse,
  Meal,
  MealResponse,
  MealSummary,
  MealSummaryResponse
} from "@/types/meal";

const categoryCache = new Map<string, MealSummary[]>();
const areaCache = new Map<string, MealSummary[]>();

export async function handleResponse<T>(response: Response, fallback: T) {
  if (!response.ok) return fallback;

  try {
    const data: T = await response.json();
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

export async function searchMeals(query: string): Promise<Meal[]> {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`, { method: 'GET' });
    const data: MealResponse = await handleResponse<MealResponse>(response, { meals: [] })
    return data.meals ?? [];
}

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`/api/categories`, { method: 'GET' });
    const data: CategoryResponse = await handleResponse<CategoryResponse>(response, { categories: [] })
    return data.categories ?? [];
}

export async function getAreas(): Promise<Area[]> {
    const response = await fetch(`/api/areas`, { method: 'GET' });
    const data: AreaResponse = await handleResponse<AreaResponse>(response, { meals: [] })
    return data.meals ?? [];
}

export async function filterByCategory(selected: string[]): Promise<MealSummary[]> {
  const key = selected.join(',');
  if(categoryCache.has(key)) return categoryCache.get(key)!;

  const params = new URLSearchParams();
  params.set('categories', selected.join(','));

  const response = await fetch(`/api/filter/category?${params}`, { method: 'GET' });
  const data: MealSummaryResponse = await handleResponse<MealSummaryResponse>(response, { meals: [] })

  categoryCache.set(key, data.meals ?? []);
  return data.meals ?? [];
}

export async function filterByArea(selected: string[]): Promise<MealSummary[]> {
  const key = selected.join(',');
  if(areaCache.has(key)) return areaCache.get(key)!;

  const params = new URLSearchParams();
  params.set('areas', selected.join(','));

  const response = await fetch(`/api/filter/area?${params}`, { method: 'GET' });
  const data: MealSummaryResponse = await handleResponse<MealSummaryResponse>(response, { meals: [] })

  areaCache.set(key, data.meals ?? []);
  return data.meals ?? [];
}
