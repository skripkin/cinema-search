import { useQuery } from "react-query";

const API_KEY = "180f2b74bf30dd77772d68e38322605f";
const BASE_URL = "https://api.themoviedb.org/3";

export const useMovieQuery = (movieID: any) => {
  return useQuery(["movie", movieID], async () => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieID}?api_key=${API_KEY}&language=ru-RU`
    );
    
    if(response.status === 200) {
      return response.json();
    } else {
      return { data: {} };
    }
  });
};
