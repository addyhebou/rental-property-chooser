// pages/api/fetch-rent.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import cheerio from 'cheerio';

type RentData = { [key: string]: string };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { zipcode } = req.query;

  if (typeof zipcode !== 'string') {
    return res.status(400).json({ error: 'Invalid zipcode parameter' });
  }

  try {
    const url = `https://www.laalmanac.com/economy/ec40b.php`; // Replace with the actual URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    console.log({ $ });

    // Example: Extracting data from a table
    const rentData: RentData = {};
    $('#rent-prices tr').each((i, row) => {
      // Replace '#rent-prices' with the actual table selector
      if (i === 0) return; // Skip the header row
      const cells = $(row).find('td');
      const key = $(cells[0]).text().trim();
      const value = $(cells[1]).text().trim();
      rentData[key] = value;
    });

    res.status(200).json(rentData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export default handler;
