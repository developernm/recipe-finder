export const MEAL_API_BASE: string = process.env.NEXT_PUBLIC_API_BASE!;

// Helper function to call the api without duplication.
// Injects the base url from the .env.local file and takes in a generic type to return a resopnse
export async function mealApi<T>(path: string): Promise<T> {
  const response = await fetch(`${MEAL_API_BASE}${path}`);
  if(!response.ok) {
    console.error('Failed to fetch meals:', response.statusText);
    throw new Error('Failed to fetch meals');
  }
  return response.json() as Promise<T>;
}