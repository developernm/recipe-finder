import type {NextApiRequest, NextApiResponse} from 'next';
import type { AreaResponse } from '../../types/meal';
import {mealApi} from "@/lib/api/meals";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AreaResponse>) {
    try {
        const data = await mealApi<AreaResponse>(`/list.php?a=list`);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching areas:', err);
        return res.status(500).json({ meals: [] });
    }
}

