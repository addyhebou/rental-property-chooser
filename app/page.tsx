'use client';
import { useEffect, useState } from 'react';
import { handleValueChange, Property, Unit } from './utils';
import { unitMarketPrices } from './constants';
import { InputSection } from './components/InputSection';
import { DisplaySection } from './components/DisplaySection';
import { pageStyles } from './pageStyles';

export default function Home() {
  // const [units, setUnits] = useState<string>(''); // e.g., "2 4 3 2"
  // const [homePrice, setHomePrice] = useState<number>(0);
  // const [interestRate, setInterestRate] = useState<number>(6.8);
  // const [loanTermInYears, setLoanTermInYears] = useState<number>(30);
  // const
  const [result, setResult] = useState<{
    verdict: string;
    profit: string;
    estimatedMortgage: number;
    estimatedIncome: number;
    adjustedUnits: Unit[];
  } | null>(null);
  const [zipcode, setZipcode] = useState('');
  // const [rentData, setRentData] = useState(null);

  // const handleSubmit = (e: React.FormEvent) => {
  // useEffect(() => {
  // e.preventDefault();

  // Parse the units input
  // const unitArray: Unit[] = units.split(' ').map((value) => {
  //   const [count, bedrooms] = value.split('-').map(Number);
  //   return { count, bedrooms, rent: unitMarketPrices[bedrooms] };
  // });

  // const property: Property = {
  //   units: unitArray,
  //   homePrice,
  //   interestRate: interestRate / 100, // Convert percentage to decimal
  //   loanTermInYears,
  // };

  //   const {
  //     verdict,
  //     profit,
  //     estimatedMortgage,
  //     estimatedIncome,
  //     adjustedUnits,
  //   } = handleValueChange(property);
  //   setResult({
  //     verdict,
  //     profit,
  //     estimatedIncome,
  //     estimatedMortgage,
  //     adjustedUnits,
  //   });
  //   // fetchRentData();
  // }, [units, interestRate, homePrice, loanTermInYears]);
  // };
  // const fetchRentData = async () => {
  //   try {
  //     const response = await fetch(`/api/fetch-rent?zipcode=${'90034'}`);

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const data = await response.json();
  //     setRentData(data);
  //   } catch (error) {
  //     console.error('Error fetching rent data:', error);
  //   }
  // };

  const qualificationStatus = result
    ? result.estimatedMortgage - 3535 / 0.75 <= result.estimatedIncome
    : false;

  useEffect(() => {}, []);

  return (
    <div className={pageStyles}>
      {/* <h1>Welcome Back</h1>
      <p>Please enter the following details.</p> */}
      {/* <form className="formStyles">
        <div className="inputField">
          <p>Home Price:</p>
          <input
            type="number"
            value={homePrice}
            placeholder="Enter the home price"
            onChange={(e) => setHomePrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Units (format: count-bedrooms count-bedrooms ...):</label>
          <input
            type="text"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            placeholder="e.g., 2 4 3 2"
          />
        </div>
        <div>
          <label>Interest Rate (%):</label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Loan Term (Years):</label>
          <input
            type="number"
            value={loanTermInYears}
            onChange={(e) => setLoanTermInYears(Number(e.target.value))}
          />
        </div>
        <button type="submit">Calculate Profitability</button>
        {result && (
          <div>
            <h2>Result</h2>
            <p>Verdict: {result.verdict}</p>
            <p>
              Profit:{' '}
              <span
                style={{
                  color:
                    parseFloat(result.profit.slice(1)) > 0
                      ? 'lightgreen'
                      : 'red',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  textDecorationLine: 'underline',
                }}
              >
                {result.profit}
              </span>
            </p>
            <p>Esimated Mortage: {result.estimatedMortgage}</p>
            <p>Esimated Income: {result.estimatedIncome}</p>
            <br></br>
            <p>
              This qualifies with NACA – Qualification status:{' '}
              <span
                style={{
                  color: qualificationStatus ? 'lightgreen' : 'red',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  textDecorationLine: 'underline',
                }}
              >
                {qualificationStatus.toString()}
              </span>
            </p>
            <br></br>
            <p>Adjusted Units for Rent-Free:</p>
            <p>
              To reach the target mortgage monthly amount of $
              {result.estimatedMortgage}:
            </p>
            <ul>
              {result.adjustedUnits.map((unit) => {
                const percentageDifference = Math.round(
                  (unit.rent / unitMarketPrices[unit.bedrooms]) * 100
                );
                const dollarIntegerDifference = Math.round(
                  unit.rent - unitMarketPrices[unit.bedrooms]
                );
                const individualDifference =
                  unit.rent / unit.bedrooms -
                  unitMarketPrices[unit.bedrooms] / unit.bedrooms;
                return (
                  !(unit.bedrooms === 1 && unit.count === 0) && (
                    <li>
                      {unit.bedrooms}-bedroom will cost {unit.rent}. There's
                      only {unit.count} of them. This is about{' '}
                      {percentageDifference}% of the market price, with $
                      {dollarIntegerDifference} difference. Meaning each tenant
                      in that unit will have to pay ${unit.rent / unit.bedrooms}{' '}
                      instead of $
                      {unitMarketPrices[unit.bedrooms] / unit.bedrooms}, a total
                      of ${individualDifference} difference.
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        )}
      </form> */}
      <InputSection />
      <DisplaySection />
    </div>
  );
}
