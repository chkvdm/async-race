export type Car = {
  id: number;
  name: string;
  color: string;
};

export type CreatedCar = {
  name: string;
  color: string;
};

export type CarStateOnTreck = {
  position: number;
  engineStatus: string;
  engineCondition: boolean;
  isDrive: boolean;
  trackTime: number;
  trackTimeAfterPause: number;
  carStateOnTreckError: string;
};

export type CarTrackTimeParameters = {
  velocity: number;
  distance: number;
};

export type EngineCondition = {
  success: boolean;
};
