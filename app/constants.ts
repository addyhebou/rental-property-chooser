import { getUnitMarketPrices } from './utils';

// Define the prices for each unit type
// export const unitMarketPrices = [0, 2006, 2544, 3263, 3600];

// https://www.huduser.gov/portal/datasets/fmr/fmrs/FY2024_code/2024summary.odn

// https://www.laalmanac.com/economy/ec40b.php – For zipcode based market rent

export const unitMarketPrices = (zipcode: string) =>
  getUnitMarketPrices(zipcode);
