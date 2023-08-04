export interface streamSchema {
  name: string;
  type: string;
  properties: { nullable: boolean };
  value: string;
  startTimestamp: number;
  endTimestamp: number;
}
