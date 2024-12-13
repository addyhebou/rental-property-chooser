/**
 * example UnitMap:
 * {
 * 'Studio': { count: 1, rent: 1500 },
 * '1-Bedroom': { count: 2, rent: 2000 },
 * '2-Bedroom': { count: 4, rent: 2500 },
 * }
 */
export interface UnitMap {
  Studio: Unit;
  '1-Bedroom': Unit;
  '2-Bedroom': Unit;
  '3-Bedroom': Unit;
  '4-Bedroom': Unit;
}

export interface Unit {
  count: number;
  rent: number;
}
