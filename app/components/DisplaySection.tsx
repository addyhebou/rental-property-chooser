import React, { useEffect } from 'react';
import {
  displaySectionStyles,
  offerSectionStyles,
} from './DisplaySectionStyles';
import HouseIconSVG from '../HouseIcon.svg';
import Image from 'next/image';
import { RentFreeDetails } from './RentFreeDetails';
import { ProfitCalculation } from './ProfitCalculation';
import { useStore } from '../useStore';
import { formatCurrency, handleValueChange, Property } from '../utils';

export const DisplaySection = () => {
  const { testUnitMap, storeUnitMap, setEstimatedMortgage } = useStore();
  const { verdict, profit, estimatedMortgage, estimatedIncome, adjustedUnits } =
    handleValueChange();
  useEffect(() => {
    setEstimatedMortgage(estimatedMortgage);
  }, [estimatedMortgage]);

  return (
    <div className={displaySectionStyles}>
      <div className="content">
        <div className={offerSectionStyles}>
          <Image src={HouseIconSVG} alt={''} />
          <div className="offerDetails">
            <h1>{verdict}</h1>
            <h1>
              Profit:{' '}
              <span style={{ color: profit > 0 ? 'green' : 'red' }}>
                {formatCurrency(profit)}
              </span>
            </h1>
            <ProfitCalculation
              row1Title="Estimated Income"
              row1Value={estimatedIncome}
              row2Title="Estimated Mortgage"
              row2Value={estimatedMortgage}
              finalRowTitle="Estimated Profit"
            />
          </div>
        </div>
        <RentFreeDetails />
      </div>
    </div>
  );
};