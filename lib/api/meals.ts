export const MEAL_API_BASE: string = process.env.NEXT_PUBLIC_API_BASE!;

export async function mealApi<T>(path: string): Promise<T> {
  const response = await fetch(`${MEAL_API_BASE}${path}`);
  if(!response.ok) {
    console.error('Failed to fetch meals:', response.statusText);
    throw new Error('Failed to fetch meals');
  }
  return response.json() as Promise<T>;
}