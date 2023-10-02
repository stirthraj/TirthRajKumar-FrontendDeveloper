import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
};

export const capsuleSlice = createSlice({
  name: 'capsule',
  initialState,
  reducers: {
    dataAdd: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { dataAdd } = capsuleSlice.actions;

export default capsuleSlice.reducer;
