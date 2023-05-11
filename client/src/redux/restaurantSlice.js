import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restId: null,
};

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestIdDetails: (state, action) => {
      state.restId = action.payload;
    },
  },
});

export const { setRestIdDetails } = restaurantSlice.actions;

export default restaurantSlice.reducer;
