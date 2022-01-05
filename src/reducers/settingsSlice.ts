import { types } from "@babel/core";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  activeNavigationItemId: 'albums'
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setActiveNavigationItemId: (state, action) => {
      state.activeNavigationItemId = action.payload as string;
    }
  }
});

export const { setActiveNavigationItemId } = settingsSlice.actions;

export const selectactiveNavigationItemId = (state: any) => (state.settings as typeof initialState).activeNavigationItemId;


export default settingsSlice.reducer;