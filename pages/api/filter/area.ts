import type {NextApiRequest, NextApiResponse} from 'next';
import {MealsResult, MealSummary, MealSummaryResponse} from '../../../types/meal';
import {mealApi} from "@/lib/api/meals";

export default async function handler(req: NextApiRequest, res: NextApiResponse<MealsResult>) {
  try {
    const { areas } = req.query;

    if (!areas) {
      return res.status(400).json({ error: 'areas parameter is missing!' });
    }

    const selected = (areas as string).split(',');
    const results: MealSummary[] = [];

    // No access to premium api call to handle multiple...
    for (const area of selected) {
      const data = await mealApi<MealSummaryResponse>(`/filter.php?a=${encodeURIComponent(area)}`);
      if (data.meals) results.push(...data.meals)
    }

    const uniqueMealsOnly = Array.from(new Map(results.map(meal => [meal.idMeal, meal])).values());
    res.status(200).json({ meals: uniqueMealsOnly });

  } catch (err) {
    console.error('Area filter api error:', err);
    return res.status(500).json({ error: "Failed to filter by area"});
  }
}
