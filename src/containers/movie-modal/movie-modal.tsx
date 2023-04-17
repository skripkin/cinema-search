import { useEffect, useMemo, useState } from "react";
import { ModalBox, Spiner } from "../../components";
import moviewModalStyles from "./movie-modal.module.css";
import { useLocation, useHistory } from "react-router-dom";
import { convertMinutesToHoursAndMinutes } from "../../hooks/getTimeConvert";
import { useMovieQuery } from "../../services/movie.service";

const MovieModal = () => {
  const history = useHistory();
  const location = useLocation();
  const imageBaseUrl = useMemo(() => "https://image.tmdb.org/t/p/", []);
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setID] = useState<string>();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const { data, isLoading } = useMovieQuery(id);

  useEffect(() => {
    const unlisten = history.listen((location) => {
      const movieID = new URLSearchParams(location.search).get("movieID");
      if (movieID) {
        setID(movieID);
        handleModalOpen(true);
      }
    });
    return () => {
      unlisten();
    };
  }, [history]);

  const handleModalOpen = (value: boolean) => {
    if (value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    setModalOpen(value);
  };

  const handleModalClose = () => {
    searchParams.delete("movieID");
    history.replace({
      search: searchParams.toString(),
      pathname: location.pathname,
    });
    handleModalOpen(false);
  };

  return (
    <ModalBox isOpen={modalOpen} onClose={() => handleModalClose()}>
      {isLoading || !data ? (
        <div className={moviewModalStyles.spiner}>
          <Spiner />
        </div>
      ) : (
        <div className={moviewModalStyles.container}>
          <img
            className={moviewModalStyles.poster}
            src={imageBaseUrl + "w500" + data.poster_path}
            alt={data.original_title}
          />
          <div>
            <p className={moviewModalStyles.title}>{data.title}</p>
            {data.genres && (
              <p className={moviewModalStyles.genre}>
                {data.genres.map((item: any) => item.name + " ")}
              </p>
            )}
            <p className={moviewModalStyles["time-box"]}>
              <span className={moviewModalStyles.time}>
                {data.release_date && data.release_date.slice(0, 4)}
              </span>
              <span className={moviewModalStyles.time}>
                {convertMinutesToHoursAndMinutes(data.runtime)}
              </span>
            </p>
            <p className={moviewModalStyles.tagline}>{data.tagline}</p>
            <p className={moviewModalStyles.description}>{data.overview}</p>
          </div>
          <div className={moviewModalStyles.rating}>{data.vote_average}</div>
        </div>
      )}
    </ModalBox>
  );
};

export default MovieModal;
