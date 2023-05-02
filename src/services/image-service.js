import axios from 'axios';

const API_KEY = '10919833-bca9a9d79073941b794319666';
axios.defaults.baseURL = 'https://pixabay.com/';

const getImages = async (query, page) => {
  const options = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 12,
    },
  };

  const { data } = await axios.get('api/', options);
  return data;
};

export default getImages;
