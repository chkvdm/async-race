const handleApiRequest = async <T>(apiCall: () => Promise<T>, rejectWithValue: Function) => {
  try {
    return await apiCall();
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Something went wrong');
  }
};

export default handleApiRequest;
