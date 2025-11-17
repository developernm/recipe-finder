import type { NextApiRequest, NextApiResponse } from 'next';
import type { MealResponse } from '../../types/meal';
import {mealApi} from "@/lib/api/meals";

export default async function handler(req: NextApiRequest, res: NextApiResponse<MealResponse>) {
    const { query } = req.query;

    try {
        // Fetch the data from our real api using our helper function (again encoding the uri just incase special characters are passed through)
        const data = await mealApi<MealResponse>(`/search.php?s=${encodeURIComponent(query as string)}`);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching meals:', err);
        return res.status(500).json({ meals: null });
    }
}

