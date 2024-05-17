import axios from 'axios';

export const fetchPokemonData = async (page, limit = 10) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
    params: {
      offset: page * limit,
      limit: limit,
    },
  });
  return response.data;
};
export const fetchPokemonDataContent = async (url, limit = 10) => {
  const response = await axios.get(`${url}`, {
    params: {
      limit: limit,
    },
  });
  return response.data;
};


export const fetchUserDataFromApi = async (page, limit) => {
  const response = await axios.get(`https://reqres.in/api/users`, {
    params: {
      page: page,
      per_page: limit,
    },
  });
  return response.data;
};