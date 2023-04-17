import { useQuery } from "react-query";

const API_KEY = "180f2b74bf30dd77772d68e38322605f";
const BASE_URL = "https://api.themoviedb.org/3";

export const useGenres = () => {
  return useQuery(
    "genres",
    async () => {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ru-RU`
      );
      const data = await response.json();
      return data.genres.map((movie: any) => ({
        title: movie.name,
        value: movie.id,
      }));
    },
    {
      keepPreviousData: true,
      cacheTime: 60 * 60 * 1000,
    }
  );
};

export const useRatings = () => {
  return useQuery(
    "allRatings",
    async () => {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&vote_average.gte=0`
      );
      const data = await response.json();
      return data.results.map((movie: any, index: string) => ({
        title: movie.vote_average,
        value: index,
      }));
    },
    {
      keepPreviousData: true,
      cacheTime: 60 * 60 * 1000,
    }
  );
};

export const useYears = () => {
  return useQuery(
    "years",
    async () => {
      const currentYear = new Date().getFullYear();
      const startYear = 1874;
      const years = [];

      for (let year = currentYear; year >= startYear; year--) {
        years.push({ title: `${year}`, value: `${year}` });
      }

      return years as any;
    },
    {
      keepPreviousData: true,
      cacheTime: 60 * 60 * 1000,
    }
  );
};
