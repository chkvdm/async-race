import { CarConstants } from '@garageTypes/enums/garage.enums';

export const getTrackAndCarPositions = async (
  carElement: HTMLSpanElement
): Promise<{
  trackLength: number;
  trackFinishPosition: number;
  currentCarPosition: number;
} | null> => {
  const { parentElement } = carElement;
  if (!parentElement) {
    return null;
  }
  const trackLength = parentElement.getBoundingClientRect().width;
  const trackFinishPosition = parentElement.getBoundingClientRect().right;
  const currentCarPosition = carElement.getBoundingClientRect().right;

  return { trackLength, trackFinishPosition, currentCarPosition };
};

export const calculateRemainingDistance = async (
  trackFinishPosition: number,
  currentCarPosition: number,
  trackLength: number
): Promise<{ remainingDistance: number; remainingDistanceInPercent: number }> => {
  const remainingDistance = trackFinishPosition - currentCarPosition + CarConstants.CAR_SIZE;
  const remainingDistanceInPercent = (remainingDistance / trackLength) * 100;
  return { remainingDistance, remainingDistanceInPercent };
};
