import { configureStore } from '@reduxjs/toolkit';
import pokemonDataReducer from './pokemonDataSlice';
import userDataReducer from './userSlice';

const store = configureStore({
  reducer: {
    pokemonData: pokemonDataReducer,
    userData: userDataReducer,
  },
});

export default store;