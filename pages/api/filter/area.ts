import type {NextApiRequest, NextApiResponse} from 'next';
import type {AreaResponse} from '../../../types/meal';

export default async function handler(req: NextApiRequest, res: NextApiResponse<AreaResponse>) {
  const { query } = req.query;

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(query as string)}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching filtered category:', err);
    return res.status(500).json({ meals: [] });
  }
}

