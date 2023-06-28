import {CALENDAR_INTERVALS} from './enum';

export const nameOfFactory = <T>() => (name: keyof T): any => name;
export const asInstance = <T>() => (data: any): T => data as T;

export function getYearRange(): string {
  return CALENDAR_INTERVALS.startDate + ':' + CALENDAR_INTERVALS.endDate;
}
