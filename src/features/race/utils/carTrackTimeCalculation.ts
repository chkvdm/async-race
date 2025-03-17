import engineApi from '@raceFeatures/api/engineApi';
import { EngineStatus } from '@garageTypes/enums/garage.enums';

export const trackTimeCalculation = async (
  id: number,
  engineStatus: EngineStatus
): Promise<number> => {
  const { distance, velocity } = await engineApi.getTrackTimeParameters(id, engineStatus);
  return velocity ? Math.round(distance / velocity) : 0;
};

export const calculateRemainingTrackTime = async (
  remainingDistance: number,
  trackLength: number,
  trackTime: number
): Promise<number> => {
  return (remainingDistance * trackTime) / trackLength;
};

export const convertMillisecondsToSeconds = async (milliseconds: number): Promise<number> => {
  return milliseconds / 1000;
};
