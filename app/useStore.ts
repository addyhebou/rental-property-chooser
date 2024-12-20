import { create } from 'zustand';
import { UnitMap } from './types';
import { unitMarketPrices } from './constants';

// Define the shape of the store
interface StoreState {
  homePrice: number;
  setHomePrice: (price: number) => void;
  interestRate: number;
  setInterestRate: (rate: number) => void;
  loanTermInYears: number;
  setLoanTermInYears: (term: number) => void;
  verdict: string;
  setVerdict: (verdict: string) => void;
  profit: string;
  setProfit: (profit: string) => void;
  estimatedMortgage: number;
  setEstimatedMortgage: (estimatedMortgage: number) => void;
  estimatedIncome: number;
  setEstimatedIncome: (estimatedIncome: number) => void;
  testUnitMap: UnitMap;
  setTestUnitMap: (testUnitMap: UnitMap) => void;
  zipcode: string;
  setZipcode: (zipcode: string) => void;
}

// Create a store with the initial state
export const useStore = create<StoreState>((set) => {
  const initialZipcode = '90034';
  return {
    homePrice: 0,
    setHomePrice: (homePrice) => set({ homePrice }),
    interestRate: 6.8,
    setInterestRate: (interestRate) => set({ interestRate }),
    loanTermInYears: 30,
    setLoanTermInYears: (loanTermInYears) => set({ loanTermInYears }),
    testUnitMap: {
      Studio: {
        count: 0,
        rent: unitMarketPrices(initialZipcode)['Studio'],
      },
      '1-Bedroom': {
        count: 0,
        rent: unitMarketPrices(initialZipcode)['1-Bedroom'],
      },
      '2-Bedroom': {
        count: 0,
        rent: unitMarketPrices(initialZipcode)['2-Bedroom'],
      },
      '3-Bedroom': {
        count: 0,
        rent: unitMarketPrices(initialZipcode)['3-Bedroom'],
      },
      '4-Bedroom': {
        count: 0,
        rent: unitMarketPrices(initialZipcode)['4-Bedroom'],
      },
    },
    setTestUnitMap: (testUnitMap) => {
      set({ testUnitMap });
    },
    verdict: '',
    setVerdict: (verdict) => set({ verdict }),
    profit: '',
    setProfit: (profit) => set({ profit }),
    estimatedMortgage: 0,
    setEstimatedMortgage: (estimatedMortgage) => set({ estimatedMortgage }),
    estimatedIncome: 0,
    setEstimatedIncome: (estimatedIncome) => set({ estimatedIncome }),
    zipcode: initialZipcode,
    setZipcode: (zipcode) => set({ zipcode }),
  };
});
