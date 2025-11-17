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
  // if response is not okay then do the follwing
  if (!response.ok) {
    let message = `Failed to fetch data: ${response.status}`;

    try {
      // get the error data
      const errorData = await response.json();

      // if error data is there (safe way to access using the ?)
      if (errorData?.error) message = errorData.error;
    } catch (err) {
      // We can use application insights to log errors, provided we have a key etc
      console.log(`Failed to fetch data: ${response.status}`, err);
    }

    // Throw the error to display a graceful message further up
    throw new Error(message);
  }

  // Response was okay, so return the data
  const data: T = await response.json();
  return data;
}

// Public API functions (Api routes)
export async function searchMeals(query: string): Promise<Meal[]> {
    // fetch from the api (pages router) eg: pages > api > search
    // encode the uri component as they may pass in special characteres
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`, { method: 'GET' });

    // grab the resposne and return
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
  // Gets the array and joins by comma
  const key = selected.join(',');
  if(categoryCache.has(key)) return categoryCache.get(key)!;

  // Gets the array and joins by comma
  const params = new URLSearchParams();
  params.set('categories', selected.join(','));

    // Set the params to search by and pass them through to the api call.
  const response = await fetch(`/api/filter/category?${params}`, { method: 'GET' });
  const data: MealSummaryResponse = await handleResponse<MealSummaryResponse>(response)

  // cache the response and set it to the key (could be multiple ie: breakfast,dinner)
  categoryCache.set(key, data.meals ?? []);
  return data.meals ?? [];
}

export async function filterByArea(selected: string[]): Promise<MealSummary[]> {
  // Gets the array and joins by comma
  const key = selected.join(',');
  // if the key exists then return the cached response
  if(areaCache.has(key)) return areaCache.get(key)!;

  // Set the params to search by and pass them through to the api call.
  const params = new URLSearchParams();
  params.set('areas', selected.join(','));

  const response = await fetch(`/api/filter/area?${params}`, { method: 'GET' });
  const data: MealSummaryResponse = await handleResponse<MealSummaryResponse>(response)

  // cache the response and set it to the key (could be multiple ie: breakfast,dinner)
  areaCache.set(key, data.meals ?? []);
  return data.meals ?? [];
}
