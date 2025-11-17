import type {NextApiRequest, NextApiResponse} from 'next';
import {MealsResult, MealSummary, MealSummaryResponse} from '../../../types/meal';
import {mealApi} from "@/lib/api/meals";

export default async function handler(req: NextApiRequest, res: NextApiResponse<MealsResult>) {
  try {
    // get the categories
    const { categories } = req.query;

    // If no categories then return 400
    if (!categories) {
      return res.status(400).json({ error: 'categoriess parameter is missing!' });
    }

      // Get selected categories and split them by comma
    const selected = (categories as string).split(',');
    const results: MealSummary[] = [];

    // No access to premium api call to handle multiple...
    for (const category of selected) {
        // Loops through all areas and builds up results array
      const data = await mealApi<MealSummaryResponse>(`/filter.php?c=${encodeURIComponent(category)}`);
      if (data.meals) results.push(...data.meals)
    }

      /* Loops through results, gives a key value pair, then Map removes the duplicates (overwrites them with the latest), then returns a flat array of unique meals */
    const uniqueMealsOnly = Array.from(new Map(results.map(meal => [meal.idMeal, meal])).values());
    res.status(200).json({ meals: uniqueMealsOnly });

  } catch (err) {
    console.error('Category filter api error:', err);
    return res.status(500).json({ error: "Failed to filter by category"});
  }
}

