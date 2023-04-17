import { Card, Pagination } from "../../components";
import dashoboardStyles from "./dashboard.module.css";
import { useMovies } from "../../services/dashboard.service";
import { useHistory, useLocation } from "react-router-dom";
import { useMemo, useCallback } from "react";

const Dashboard = () => {
  const { movies, isLoading, isError, page } = useMovies();
  const history = useHistory();
  const location = useLocation();

  const imageBaseUrl = useMemo(() => "https://image.tmdb.org/t/p/", []);

  const handlePrevPage = useCallback(() => {
    if (+page > 1) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("page", (+page - 1).toString());
      history.push({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    }
  }, [page, location, history]);

  const handleNextPage = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", (+page + 1).toString());
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }, [page, location, history]);

  const handlePosterOpen = (id: number | string) => {
    let url = `?movieID=${id}&`;
    history.push(url);
  };

  if (isLoading) return null;
  if (isError) return <div>Error loading movies.</div>;

  return (
    <>
      <div className={dashoboardStyles.general}>
        <div className={dashoboardStyles.container}>
          {movies.map((movie: any) => (
            <Card
              key={movie.id}
              id={movie.id}
              poster={imageBaseUrl + "w500" + movie.poster_path}
              title={movie.title}
              year={
                movie.release_date
                  ? movie.release_date.slice(0, 4)
                  : movie.release_date
              }
              rating={movie.vote_average}
              onMoveClick={(id) => handlePosterOpen(id)}
            />
          ))}
        </div>
      </div>
      <Pagination
        onPreviewClick={handlePrevPage}
        onNextClick={handleNextPage}
      />
    </>
  );
};

export default Dashboard;
