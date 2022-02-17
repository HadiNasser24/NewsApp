import axios from 'axios';

import { NEWS_URL } from '&config/urls';
import { API_KEY } from '&config/keys';

export const getSourceHeadlines = async (source: string) => {
  return axios.get(`${NEWS_URL}/v2/top-headlines?sources=${source}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
};
