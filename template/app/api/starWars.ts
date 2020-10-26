import Axois from 'axios';

const getStarWarsCharacter = async (id: number) => {
  let result;
  try {
    result = await Axois.get(`https://swapi.dev/api/people/${id}/`);
  } catch (error) {
    result = {
      data: {
        error: 'Failed',
      },
    };
  }

  return result.data;
};

export { getStarWarsCharacter };
