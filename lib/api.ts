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

// Cache for filter results
const categoryCache = new Map<string, MealSummary[]>();
const areaCache = new Map<string, MealSummary[]>();

// Helper function to handle API responses
export async function handleResponse<T>(response: Response) {
  if (!response.ok) {
    let message = `Failed to fetch data: ${response.status}`;

    try {
      const errorData = await response.json();
      if (errorData?.error) message = errorData.error;
    } catch { }

    throw new Error(message);
  }

  const data: T = await response.json();
  return data;
}

// Public API functions
export async function searchMeals(query: string): Promise<Meal[]> {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`, { method: 'GET' });
    const data: MealResponse = await handleResponse<MealResponse>(response)
    return data.meals ?? [];
}

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`/api/categories`, { method: 'GET' });
    const data: CategoryResponse = await handleResponse<CategoryResponse>(response)
    return data.categories ?? [];
}

export async function getAreas(): Promise<Area[]> {
    const response = await fetch(`/api/areas`, { method: 'GET' });
    const data: AreaResponse = await handleResponse<AreaResponse>(response)
    return data.meals ?? [];
}

export async function filterByCategory(selected: string[]): Promise<MealSummary[]> {
  const key = selected.join(',');
  if(categoryCache.has(key)) return categoryCache.get(key)!;

  const params = new URLSearchParams();
  params.set('categories', selected.join(','));

  const response = await fetch(`/api/filter/category?${params}`, { method: 'GET' });
  const data: MealSummaryResponse = await handleResponse<MealSummaryResponse>(response)

  categoryCache.set(key, data.meals ?? []);
  return data.meals ?? [];
}

export async function filterByArea(selected: string[]): Promise<MealSummary[]> {
  const key = selected.join(',');
  if(areaCache.has(key)) return areaCache.get(key)!;

  const params = new URLSearchParams();
  params.set('areas', selected.join(','));

  const response = await fetch(`/api/filter/area?${params}`, { method: 'GET' });
  const data: MealSummaryResponse = await handleResponse<MealSummaryResponse>(response)

  areaCache.set(key, data.meals ?? []);
  return data.meals ?? [];
}
