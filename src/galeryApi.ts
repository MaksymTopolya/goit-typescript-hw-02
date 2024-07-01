import axios from 'axios';

const UNSPLASH_API_BASE_URL = 'https://api.unsplash.com';

const ACCESS_KEY = 'upAmkux6OgU_nR4G3ffBtuKLZX0L_HxAZEqnFMPbvoE';

const unsplashApi = axios.create({
  baseURL: UNSPLASH_API_BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

interface searchCollectionsType {
  query: string,
  page: number,
  perPage?: number,
}

interface promiseType {
    id: number;
  cover_photo: {
    urls: {
      small: string;
    };
    alt_description: string;
  }
}

interface SearchResponse {
  results: promiseType[];
  total_pages: number,
}

export const searchCollections = async ({ query, page, perPage = 10 }: searchCollectionsType) :Promise<SearchResponse>=> {
  try {
    const response = await unsplashApi.get('/search/collections', {
      params: {
        query,
        page,
        per_page: perPage,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error : unknown) {
    console.error('Error searching collections:', error.response?.data || error.message);
    throw error;
  }
};
