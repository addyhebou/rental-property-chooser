import React, { useEffect } from 'react';
import {
  displaySectionStyles,
  offerSectionStyles,
  rareFindStyles,
} from './DisplaySectionStyles';
import HouseIconSVG from '../HouseIcon.svg';
import Image from 'next/image';
import { RentFreeDetails } from './RentFreeDetails';
import { ProfitCalculation } from './ProfitCalculation';
import { useStore } from '../useStore';
import { formatCurrency, handleValueChange } from '../utils';
import { cx } from '@emotion/css';

export const DisplaySection = () => {
  const { setEstimatedMortgage, homePrice } = useStore();
  const { verdict, profit, estimatedMortgage, estimatedIncome, adjustedUnits } =
    handleValueChange();
  useEffect(() => {
    setEstimatedMortgage(estimatedMortgage);
  }, [estimatedMortgage]);

  // A property is considered a rare find if the estimated income is at least 1% of the home price.
  const rareFind = estimatedIncome >= homePrice * 0.01 && homePrice > 0;

  return (
    <div className={displaySectionStyles}>
      <div className="content">
        <div className={cx(offerSectionStyles, rareFind && rareFindStyles)}>
          <Image src={HouseIconSVG} alt={''} />
          <div className="offerDetails">
            <h1>{rareFind ? '⭐️RARE FIND' : verdict}</h1>
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
