import type {NextApiRequest, NextApiResponse} from 'next';
import type {AreaResponse} from '../../../types/meal';
import {mealApi} from "@/lib/api/meals";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AreaResponse>) {
  const { query } = req.query;

  try {
    const data = await mealApi<AreaResponse>(`/filter.php?a=${encodeURIComponent(query as string)}`);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching filtered category:', err);
    return res.status(500).json({ meals: [] });
  }
}

