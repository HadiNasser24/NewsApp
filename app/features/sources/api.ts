import axios from 'axios';

import { NEWS_URL } from '&config/urls';
import { API_KEY } from '&config/keys';

export const getSources = async () => {
  return axios.get(`${NEWS_URL}/v2/sources`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
};
