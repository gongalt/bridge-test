import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemonData, fetchPokemonDataContent } from '../api/api';

export const fetchPokemon = createAsyncThunk(
  'pokemonData/fetchPokemon',
  async (page, thunkAPI) => {
    try {
      const response = await fetchPokemonData(page, 10);
      const contents = await Promise.all(
        response.results.map((res) => fetchPokemonDataContent(res.url, 10))
      );
      response.results = response.results.map((result, index) => ({
        ...result,
        ...contents[index],
      }));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const pokemonDataSlice = createSlice({
	name: 'pokemonData',
	initialState: {
		data: [],
		status: 'idle',
		error: null,
		page: 0,
	},
	reducers: {
		setPokemonPage: (state, action) => {
			state.page = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPokemon.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchPokemon.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload.results;
			})
			.addCase(fetchPokemon.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { setPokemonPage } = pokemonDataSlice.actions;

export default pokemonDataSlice.reducer;
