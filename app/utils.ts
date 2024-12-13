import { unitMarketPrices } from './constants';
import { UnitMap } from './types';
import { useStore } from './useStore';
import { MARKET_RATES_FOR_2025 } from './marketRatesFor2025';

export const handleValueChange = () => {
  const { testUnitMap, homePrice, interestRate, loanTermInYears, zipcode } =
    useStore();
  // Calculate estimated monthly mortage payments.
  const estimatedMortgage = Math.round(
    calculateMortgage(homePrice, interestRate / 100, loanTermInYears)
  );
  // Calculate estimated income from all units in the property.
  const estimatedIncome = Math.round(calculateIncome(testUnitMap, zipcode));

  // Calculate and return the profit.
  const profit = Math.round(estimatedIncome - estimatedMortgage);

  const unitsWithOneOmittedOneBedroom = decrementOneBedroomUnit(testUnitMap);
  const adjustedUnits = adjustRents(
    unitsWithOneOmittedOneBedroom,
    estimatedMortgage,
    zipcode
  );

  return {
    profit,
    estimatedIncome,
    estimatedMortgage,
    verdict: profit > 0 ? '✅ Good Offer' : '❌ Bad Offer',
    adjustedUnits,
  };
};
/**
 *
 *const exampleUNitMap = {
 *  '1-Bedroom': 2,
 * '2-Bedroom': 4,
 * }
 */
export const decrementOneBedroomUnit = (testUnitMap: UnitMap): UnitMap => {
  const result: UnitMap = JSON.parse(JSON.stringify(testUnitMap));
  let aUnitHasBeenDecreased = false;
  const isASingleUnitAvailable =
    result['Studio'].count === 1 || result['1-Bedroom'].count === 1;

  const findTheCheapestRentUnit = (unitMap: UnitMap): keyof UnitMap => {
    let cheapestRent = Infinity;
    let cheapestUnit: keyof UnitMap = 'Studio';
    Object.keys(unitMap).forEach((unit) => {
      if (
        unitMap[unit as keyof UnitMap].rent < cheapestRent &&
        unitMap[unit as keyof UnitMap].count > 0
      ) {
        cheapestRent = unitMap[unit as keyof UnitMap].rent;
        cheapestUnit = unit as keyof UnitMap;
      }
    });
    return cheapestUnit;
  };
  if (isASingleUnitAvailable) {
    Object.keys(result).forEach((unitType) => {
      if (unitType === '1-Bedroom' || unitType === 'Studio') {
        if (
          result[unitType as keyof UnitMap].count > 0 &&
          !aUnitHasBeenDecreased
        ) {
          result[unitType as keyof UnitMap].count -= 1;
          aUnitHasBeenDecreased = true;
        }
      }
    });
  } else {
    const cheapestUnit = findTheCheapestRentUnit(result);
    result[cheapestUnit].count -= 1;
  }
  return result;
};

// Calculates mortgage
const calculateMortgage = (
  homePrice: number,
  interestRate: number,
  loanTermInYears: number
): number => {
  const numberOfMonthlyPayments = loanTermInYears * 12; // Number of of monthly payments
  const monthlyRate = interestRate / 12; // Convert annual rate to monthly
  const numerator =
    monthlyRate * Math.pow(1 + monthlyRate, numberOfMonthlyPayments);
  const denominator = Math.pow(1 + monthlyRate, numberOfMonthlyPayments) - 1;
  return homePrice * (numerator / denominator) * 1.12477429; // the constant is for additional fees, such as homeowners insurance and property tax
};

// Calculates the total income brought from all units in the property
const calculateIncome = (testUnitMap: UnitMap, zipcode: string): number => {
  return Math.round(
    Object.keys(testUnitMap).reduce((totalIncome, unitType) => {
      const price = unitMarketPrices(zipcode)[unitType as keyof UnitMap];
      return totalIncome + price * testUnitMap[unitType as keyof UnitMap].count;
    }, 0)
  );
};

const isNotZero = (value: number): number => (value === 0 ? 1 : value);

export const adjustRents = (
  testUnitMap: UnitMap,
  targetRent: number,
  zipcode: string
): UnitMap => {
  const adjustedUnitMarketPrices = JSON.parse(JSON.stringify(testUnitMap));

  // Calculate the total current rent
  const totalCurrentRent = Object.keys(adjustedUnitMarketPrices).reduce(
    (total, unitType) => {
      const unitCount = testUnitMap[unitType as keyof UnitMap].count;
      const unitMarketPrice =
        unitMarketPrices(zipcode)[unitType as keyof UnitMap];
      return total + unitMarketPrice * unitCount;
    },
    0
  );
  // Calculate the scaling factor
  const scalingFactor = targetRent / isNotZero(totalCurrentRent);

  // Adjust the rent for each unit
  Object.keys(adjustedUnitMarketPrices).forEach((unitType) => {
    adjustedUnitMarketPrices[unitType as keyof UnitMap].rent =
      adjustedUnitMarketPrices[unitType as keyof UnitMap].rent * scalingFactor;
  });
  return adjustedUnitMarketPrices;
};

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
};

export interface Unit {
  bedrooms: number;
  count: number;
  rent: number; // rent per unit
}

export interface Property {
  // units: Unit[]; // i.e (2 4-bedroom units, 3 2-bedroom units)
  testUnitMap: UnitMap;
  homePrice: number;
  interestRate: number;
  loanTermInYears: number;
}

export type RentData = {
  [zipcode: string]: RentDataForZipCode;
};

export type RentDataForZipCode = {
  Studio: number;
  '1-Bedroom': number;
  '2-Bedroom': number;
  '3-Bedroom': number;
  '4-Bedroom': number;
};

export const get2025MarketRent = (
  zipcode: string
): RentDataForZipCode | undefined => {
  const zipData = MARKET_RATES_FOR_2025[zipcode];
  if (!zipData) {
    console.error(`Zipcode ${zipcode} not found in data.`);
    return undefined;
  }
  return zipData;
};

export const getUnitMarketPrices = (zipcode: string): RentDataForZipCode => {
  const data = get2025MarketRent(zipcode);
  if (!data)
    return {
      Studio: 0,
      '1-Bedroom': 0,
      '2-Bedroom': 0,
      '3-Bedroom': 0,
      '4-Bedroom': 0,
    };
  return {
    Studio: data.Studio,
    '1-Bedroom': data['1-Bedroom'],
    '2-Bedroom': data['2-Bedroom'],
    '3-Bedroom': data['3-Bedroom'],
    '4-Bedroom': data['4-Bedroom'],
  };
};
