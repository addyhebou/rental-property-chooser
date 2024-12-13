import React from 'react';
import { useStore } from '../useStore';
import { FormField } from './FormField';
import { formStyles, inputSectionStyles } from './InputSectionStyles';
import { UnitMap } from '../types';
import { handleValueChange } from '../utils';

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
  } = useStore();
  return (
    <div className={inputSectionStyles}>
      <h1>Welcome Back</h1>
      <p>Please enter the following details.</p>
      <form className={formStyles}>
        <FormField
          type="single"
          label="Home Price"
          fieldType="number"
          value={homePrice}
          onChange={(value) => setHomePrice(value as number)}
        />
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
