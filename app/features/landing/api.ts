import axios from 'axios';

import { NEWS_URL } from '&config/urls';
import { API_KEY } from '&config/keys';

export const getNewsInfo = async (category: string) => {
  return axios.get(`${NEWS_URL}/v2/everything?q=${category}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
};
