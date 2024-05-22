import axios from 'axios';

export const fetchPokemonData = async (page, limit = 10) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
      params: {
        offset: page * limit,
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokemon data: ${error}`);
    throw error;
  }
};

export const fetchPokemonDataContent = async (url, limit = 10) => {
  try {
    const response = await axios.get(`${url}`, {
      params: {
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokemon data content: ${error}`);
    throw error;
  }
};

export const fetchUserDataFromApi = async (page, limit) => {
  try {
    const response = await axios.get(`https://reqres.in/api/users`, {
      params: {
        page: page,
        per_page: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching user data: ${error}`);
    throw error;
  }
};