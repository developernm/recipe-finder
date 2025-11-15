import type {NextApiRequest, NextApiResponse} from 'next';
import type { AreaResponse } from '../../types/meal';

export default async function handler(req: NextApiRequest, res: NextApiResponse<AreaResponse>) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching areas:', err);
        return res.status(500).json({ meals: [] });
    }
}

