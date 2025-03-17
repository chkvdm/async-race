import API_ENDPOINTS from 'api/endpoints';
import { EngineStatus } from '@garageTypes/enums/garage.enums';
import { CarTrackTimeParameters, EngineCondition } from '@garageTypes/types/garage.types';

const engineApi = {
  async getTrackTimeParameters(id: number, status: EngineStatus): Promise<CarTrackTimeParameters> {
    const response = await fetch(API_ENDPOINTS.ENGINE.ENGINE_START_STOP(id, status), {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error('Failed to update engine status');
    }
    return response.json();
  },

  async getEngineCondition(id: number, status: EngineStatus): Promise<EngineCondition> {
    const response = await fetch(API_ENDPOINTS.ENGINE.ENGINE_START_STOP(id, status), {
      method: 'PATCH',
    });
    if (response.status === 500) {
      return { success: false };
    }
    if (!response.ok) {
      throw new Error('Failed to drive engine');
    }
    return response.json();
  },
};

export default engineApi;
