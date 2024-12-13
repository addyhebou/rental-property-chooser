import React from 'react';
import { useStore } from '../useStore';
import { UnitMap } from '../types';
import { rentFreeDetailsStyles } from './RentFreeDetailsStyles';
import { ProfitCalculation } from './ProfitCalculation';
import { adjustRents, decrementOneBedroomUnit } from '../utils';
import { unitMarketPrices } from '../constants';

export const RentFreeDetails = () => {
  const { testUnitMap, estimatedMortgage, zipcode } = useStore();

  const UnitRentDetails = ({
    typeOfUnit,
    numberOfAvailableUnits,
    estimatedMortgage,
  }: {
    typeOfUnit: keyof UnitMap;
    numberOfAvailableUnits: number;
    estimatedMortgage: number;
  }) => {
    if (numberOfAvailableUnits === 0) {
      return;
    }
    const marketUnitRent = unitMarketPrices(zipcode)[typeOfUnit];
    const unitsWithOneOmittedOneBedroom = decrementOneBedroomUnit(testUnitMap);
    const adjustedUnits = adjustRents(
      unitsWithOneOmittedOneBedroom,
      estimatedMortgage,
      zipcode
    );
    return (
      adjustedUnits[typeOfUnit].count > 0 && (
        <ProfitCalculation
          row1Title={`Adjusted ${typeOfUnit} Unit`}
          row1Value={adjustedUnits[typeOfUnit].rent}
          row2Title={`Market Price ${typeOfUnit} Unit`}
          row2Value={marketUnitRent}
          finalRowTitle="Rate Difference"
          showPercentage
        />
      )
    );
  };

  return (
    <div className={rentFreeDetailsStyles}>
      <p>For Rent-Free Living, these are the adjusted prices:</p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          border: '1px solid black',
        }}
      >
        {Object.keys(testUnitMap).map((unit, ind) => (
          <div key={ind}>
            <UnitRentDetails
              typeOfUnit={unit as keyof UnitMap}
              numberOfAvailableUnits={testUnitMap[unit as keyof UnitMap].count}
              estimatedMortgage={estimatedMortgage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
