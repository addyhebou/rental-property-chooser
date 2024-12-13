import { profitCalculationStyles } from './ProfitCalculationStyles';

interface Props {
  row1Title: string;
  row1Value: number;
  row2Title: string;
  row2Value: number;
  finalRowTitle: string;
  //   finalRowValue will be calculaed in app
  showPercentage?: boolean;
}
export const ProfitCalculation = (infoMap: Props) => {
  const percentage = Math.round((infoMap.row1Value / infoMap.row2Value) * 100);
  const getIndicator = (percentage: number) => {
    const color = percentage > 100 ? 'red' : 'green';
    const indicator = percentage > 100 ? '↑' : percentage < 100 ? '↓' : '-';
    return (
      <span style={{ color, fontSize: '1em', fontWeight: 'bold' }}>
        {100 - percentage}% {indicator}
      </span>
    );
  };
  return (
    <div className={profitCalculationStyles}>
      <div className="profitRow">
        <p>{infoMap.row1Title}</p>
        <p>${Math.round(infoMap.row1Value)}</p>
      </div>
      <div className="profitRow">
        <p>{infoMap.row2Title}</p>
        <p>${Math.round(infoMap.row2Value)}</p>
      </div>
      <hr />
      <div className="profitRow">
        <p>{infoMap.finalRowTitle}:</p>
        <p>${Math.round(infoMap.row1Value - infoMap.row2Value)}</p>
        {infoMap.showPercentage && getIndicator(percentage)}
      </div>
    </div>
  );
};
