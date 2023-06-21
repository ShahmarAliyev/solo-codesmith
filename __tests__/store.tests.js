import userReducer, {
  setUser,
  logOutUser,
  addToRes,
  deleteReso,
} from '../client/src/redux/userSlice.js';
import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer, {
  setRestIdDetails,
} from '../client/src/redux/restaurantSlice.js';
describe('userSlice', () => {
  describe('reducers', () => {
    const initialState = {
      userId: null,
      email: '',
      resoCount: 0,
    };

    it('should handle setUser', () => {
      const user = {
        _id: 'user123',
        email: 'test@example.com',
      };
      const nextState = userReducer(initialState, setUser(user));

      expect(nextState.userId).toBe('user123');
      expect(nextState.email).toBe('test@example.com');
    });

    it('should handle logOutUser', () => {
      const nextState = userReducer(initialState, logOutUser());

      expect(nextState).toEqual(initialState);
    });

    it('should handle addToRes', () => {
      const nextState = userReducer(initialState, addToRes());

      expect(nextState.resoCount).toBe(1);
    });

    it('should handle deleteReso', () => {
      const stateWithResoCount = { ...initialState, resoCount: 3 };
      const nextState = userReducer(stateWithResoCount, deleteReso());

      expect(nextState.resoCount).toBe(2);
    });
  });
});

describe('restaurantSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        restaurant: restaurantReducer,
      },
    });
  });

  it('should handle setRestIdDetails', () => {
    const restId = 'abc123';

    store.dispatch(setRestIdDetails(restId));

    const state = store.getState().restaurant;

    expect(state.restId).toBe('abc123');
  });
});
