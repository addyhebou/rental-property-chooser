import React from 'react';
import { useStore } from '../useStore';
import { FormField } from './FormField';
import { formStyles, inputSectionStyles } from './InputSectionStyles';
import { UnitMap } from '../types';
import { get2025MarketRent, handleValueChange } from '../utils';
import { unitMarketPrices } from '../constants';

export const InputSection = () => {
  const {
    homePrice,
    setHomePrice,
    interestRate,
    setInterestRate,
    loanTermInYears,
    setLoanTermInYears,
    testUnitMap,
    setTestUnitMap,
    zipcode,
    setZipcode,
  } = useStore();

  const updateTestUnitMap = (zipcode: string) => {
    setZipcode(zipcode);
    const newRent = unitMarketPrices(zipcode);
    const {
      Studio: newStudioRent,
      '1-Bedroom': newOneBedroomRent,
      '2-Bedroom': newTwoBedroomRent,
      '3-Bedroom': newThreeBedroomRent,
      '4-Bedroom': newFourBedroomRent,
    } = newRent;
    const result: UnitMap = {
      Studio: {
        count: testUnitMap['Studio'].count,
        rent: newStudioRent,
      },
      '1-Bedroom': {
        count: testUnitMap['1-Bedroom'].count,
        rent: newOneBedroomRent,
      },
      '2-Bedroom': {
        count: testUnitMap['2-Bedroom'].count,
        rent: newTwoBedroomRent,
      },
      '3-Bedroom': {
        count: testUnitMap['3-Bedroom'].count,
        rent: newThreeBedroomRent,
      },
      '4-Bedroom': {
        count: testUnitMap['4-Bedroom'].count,
        rent: newFourBedroomRent,
      },
    };
    setTestUnitMap(result);
  };
  return (
    <div className={inputSectionStyles}>
      <h1>Welcome Back</h1>
      <p>Please enter the following details.</p>
      <form className={formStyles}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            gap: '10px',
          }}
        >
          <FormField
            type="single"
            label="Home Price"
            fieldType="number"
            value={homePrice}
            onChange={(value) => {
              setHomePrice(value as number);
              // updateTestUnitMap(zipcode);
            }}
          />
          <FormField
            type="single"
            label="Zipcode"
            fieldType="text"
            value={zipcode}
            onChange={(value) => {
              // setZipcode(value as string);
              updateTestUnitMap(value as string);
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            gap: '10px',
          }}
        >
          <FormField
            type="single"
            label="Interest Rate"
            fieldType="number"
            value={interestRate}
            onChange={(value) => setInterestRate(value as number)}
          />
          <FormField
            type="single"
            label="Loan Term (in years)"
            fieldType="number"
            value={loanTermInYears}
            onChange={(value) => setLoanTermInYears(value as number)}
          />
        </div>
        <FormField
          type="multi"
          label="Units"
          value={testUnitMap}
          fieldType="number"
          onChange={(value) => setTestUnitMap(value as UnitMap)}
        />
      </form>
    </div>
  );
};
