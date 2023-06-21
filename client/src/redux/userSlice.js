import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  email: '',
  resoCount: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, email, favourites, reservations } = action.payload;

      state.userId = _id;
      state.email = email;
    },
    logOutUser: (state) => {
      return (state = initialState);
    },
    addToRes: (state) => {
      state.resoCount = state.resoCount + 1;
    },
    deleteReso: (state) => {
      state.resoCount = state.resoCount - 1;
    },
  },
});

export const { setUser, logOutUser, addToRes, deleteReso } = userSlice.actions;

export default userSlice.reducer;
