import { createSlice } from '@reduxjs/toolkit';

import AppState from 'features/root/ts/interfaces/root.interfaces';
import PageName from 'features/root/ts/enums/root.enums';

const initialState: AppState = {
  currentPageName: PageName.GARAGE,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRootPageName: (state, action) => {
      state.currentPageName = action.payload;
    },
  },
});

export const { setRootPageName } = appSlice.actions;

export default appSlice.reducer;
