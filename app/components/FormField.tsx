import React from 'react';
import { UnitMap } from '../types';
import { formFieldStyles } from './FormFieldStyles';

interface Props {
  type: string;
  label: string;
  fieldType: 'number';
  value: number | UnitMap;
  onChange: (value: number | UnitMap) => void;
}
export const FormField = ({
  type,
  label,
  fieldType,
  value,
  onChange,
}: Props) => {
  const handleUpdateUnitMap = (
    testUnitMap: UnitMap,
    unitType: keyof UnitMap,
    count: number
  ) => {
    onChange({
      ...testUnitMap,
      [unitType]: { ...testUnitMap[unitType], count },
    });
  };
  return (
    <div className={formFieldStyles}>
      <label>{label}</label>
      {typeof value === 'number' ? (
        <input
          type={fieldType}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) as number)}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {(Object.keys(value) as (keyof UnitMap)[]).map((unit, index) => {
            const numOfAvailableUnits = value[unit].count;
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
                key={index}
              >
                <input
                  type={fieldType}
                  value={numOfAvailableUnits}
                  onChange={(e) =>
                    handleUpdateUnitMap(value, unit, Number(e.target.value))
                  }
                />
                <label>{index === 0 ? 'Studio' : index + '-Bed'}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
