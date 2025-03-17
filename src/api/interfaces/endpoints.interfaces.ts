interface ApiEndpoints {
  GARAGE: {
    GET_CARS: (page: number, limit: number) => string;
    GET_CAR: (id: number) => string;
    CREATE_CAR: () => string;
    UPDATE_CAR: (id: number) => string;
    DELETE_CAR: (id: number) => string;
  };
  ENGINE: {
    ENGINE_START_STOP: (id: number, engineStatus: string) => string;
    ENGINE_DRIVE: (id: number, engineStatus: string) => string;
  };
  WINNERS: {
    GET_WINNERS: (page: number, limit: number, sort: string, order: string) => string;
    GET_WINNER: (id: number) => string;
    CREATE_WINNER: () => string;
    UPDATE_WINNER: (id: number) => string;
    DELETE_WINNER: (id: number) => string;
  };
}

export default ApiEndpoints;
