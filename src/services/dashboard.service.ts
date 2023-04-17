import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router-dom";

const API_KEY = "180f2b74bf30dd77772d68e38322605f";
const BASE_URL = "https://api.themoviedb.org/3";

export const useMovies = () => {
  const location = useLocation();
  const history = useHistory();
  const [searchParams, setSearchParams] = useState({
    genre: "",
    rating: "",
    year: "",
    query: "",
    page: "1",
  });

  useEffect(() => {
    const unlisten = history.listen((location) => {
      setSearchParams((prevSearchParams) => ({
        ...prevSearchParams,
        genre: new URLSearchParams(location.search).get("genre") || "",
        rating: new URLSearchParams(location.search).get("rating") || "",
        year: new URLSearchParams(location.search).get("year") || "",
        query: new URLSearchParams(location.search).get("query") || "",
        page: new URLSearchParams(location.search).get("page") || "1",
      }));
    });

    return () => {
      unlisten();
    };
  }, [history]);

  useEffect(() => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      genre: new URLSearchParams(location.search).get("genre") || "",
      rating: new URLSearchParams(location.search).get("rating") || "",
      year: new URLSearchParams(location.search).get("year") || "",
      query: new URLSearchParams(location.search).get("query") || "",
      page: new URLSearchParams(location.search).get("page") || "1",
    }));
  }, [location.search]);

  const fetchMovies = async () => {
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ru-RU`;
    const { genre, rating, year, query, page } = searchParams;

    if (page) url += `&page=${page}&per_page=8`;
    if (genre) url += `&with_genres=${genre}`;
    if (rating) url += `&vote_average.gte=${rating}`;
    if (year) url += `&primary_release_year=${year}`;

    if (query) {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ru-RU&query=${query}`;
      if (year) url += `&primary_release_year=${year}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return {
      results: data.results,
      nextPage: data.page + 1,
      totalPages: data.total_pages,
    };
  };

  const { isLoading, isError, data: moviesData } = useQuery(["movies", history.location.search], fetchMovies);

  return { isLoading, isError, movies: moviesData?.results, page: searchParams.page };
};