export interface TRReading {
  tr1: string;
  tr2: string;
}

export interface TRSectionData {
  time08: TRReading;
  time14: TRReading;
  time20: TRReading;
}

export interface TRData {
  main: TRSectionData;
  sub: TRSectionData;
}

export interface SimpleMeterItem {
  id: string; // Unique identifier for the row
  label: string; // e.g., "312동"
  subId?: string | number; // e.g., "1", "2"
  value: string;
}

export interface MeterCategoryData {
  calorimeter: SimpleMeterItem[];
  mainMeter: SimpleMeterItem[];
  market: SimpleMeterItem[];
}

export interface DailyLogData {
  date: string;
  trData: TRData;
  meters: MeterCategoryData;
}