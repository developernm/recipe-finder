import type {NextApiRequest, NextApiResponse} from 'next';
import type { CategoryResponse } from '../../types/meal';
import {mealApi} from "@/lib/api/meals";

export default async function handler(req: NextApiRequest, res: NextApiResponse<CategoryResponse>) {
    try {
        // Fetch the data from our external api using our helper function
        const data = await mealApi<CategoryResponse>(`/categories.php`);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({ categories: [] });
    }
}

