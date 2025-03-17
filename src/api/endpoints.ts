import ApiEndpoints from 'api/interfaces/endpoints.interfaces';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_ENDPOINTS: ApiEndpoints = {
  GARAGE: {
    GET_CARS: (page, limit) => `${BASE_URL}/garage/?_page=${page}&_limit=${limit}`,
    GET_CAR: (id) => `${BASE_URL}/garage/${id}`,
    CREATE_CAR: () => `${BASE_URL}/garage`,
    UPDATE_CAR: (id) => `${BASE_URL}/garage/${id}`,
    DELETE_CAR: (id) => `${BASE_URL}/garage/${id}`,
  },
  ENGINE: {
    ENGINE_START_STOP: (id, engineStatus) => `${BASE_URL}/engine/?id=${id}&status=${engineStatus}`,
    ENGINE_DRIVE: (id, engineStatus) => `${BASE_URL}/engine/?id=${id}&status=${engineStatus}`,
  },
  WINNERS: {
    GET_WINNERS: (page, limit, sort, order) =>
      `${BASE_URL}/winners/?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
    GET_WINNER: (id) => `${BASE_URL}/winners/${id}`,
    CREATE_WINNER: () => `${BASE_URL}/winners`,
    UPDATE_WINNER: (id) => `${BASE_URL}/winners/${id}`,
    DELETE_WINNER: (id) => `${BASE_URL}/winners/${id}`,
  },
};

export default API_ENDPOINTS;
