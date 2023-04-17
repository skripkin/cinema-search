import { useEffect, useMemo, useState } from "react";
import { Button, Input, Select } from "../../components";
import filterStyles from "./filters.module.css";
import { useGenres, useRatings, useYears } from "../../services/filter.service";
import { useLocation, useHistory } from "react-router-dom";
import { TSelectItem } from "../../components/select/select";
import { BurgerMenu } from "../../components/icons";

const Filters = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [open, setOpen] = useState(false);
  const [activeGenres, setActiveGenres] = useState<TSelectItem>();
  const [activeRating, setActiveRating] = useState<TSelectItem>();
  const [activeYear, setActiveYear] = useState<TSelectItem>();
  const { data: genres } = useGenres();
  const { data: ratings } = useRatings();
  const { data: years } = useYears();

  useEffect(() => {
    const query = searchParams.get("query") || "";
    if (query) {
      setSearchQuery(query);
    }

    const genre = Number(searchParams.get("genre"));
    if (genre && genres) {
      const activeGenre = genres.find(
        (item: TSelectItem) => Number(item.value) === genre
      );
      setActiveGenres(activeGenre);
    }

    const rating = Number(searchParams.get("rating"));
    if (rating && ratings) {
      const activeRating = ratings.find(
        (item: TSelectItem) => Number(item.value) === rating
      );
      setActiveRating(activeRating);
    }

    const year = searchParams.get("year");
    if (year && years) {
      const activeYear = years.find((item: TSelectItem) => item.value === year);
      setActiveYear(activeYear);
    }
  }, [genres, ratings, searchParams, years]);

  const handleMenuOpen = (value: boolean) => {
    if (value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    setOpen(value);
  };

  const handleSearchClick = () => {
    let url = "?";
    if (activeGenres) url += `genre=${activeGenres.value}&`;
    if (activeRating) url += `rating=${activeRating.value}&`;
    if (activeYear) url += `year=${activeYear.value}&`;
    if (searchQuery) url += `query=${searchQuery}&`;
    url = url.slice(0, -1);
    history.push(url);
    handleMenuOpen(false);
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className={filterStyles.container}>
      <div className={filterStyles["filter-input"]}>
        <Input
          placeholder="поиск по названию"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      <div className={filterStyles["filter-select"]}>
        <Select
          title="жанр"
          activeValue={activeGenres}
          items={genres}
          onSelectItem={setActiveGenres}
        />
      </div>
      <div className={filterStyles["filter-select"]}>
        <Select
          title="рейтинг"
          activeValue={activeRating}
          items={ratings}
          onSelectItem={setActiveRating}
        />
      </div>
      <div className={filterStyles["filter-select"]}>
        <Select
          title="год"
          activeValue={activeYear}
          items={years}
          onSelectItem={setActiveYear}
        />
      </div>
      <div className={filterStyles["filter-button"]}>
        <Button title="найти" onClick={handleSearchClick} />
      </div>
      <div className={filterStyles.burgermenu}>
        <BurgerMenu open={open} onClick={() => handleMenuOpen(!open)} />
      </div>
      {open && (
        <div className={filterStyles["mobile-menu"]}>
          <div className={filterStyles["filter-input"]}>
            <Input
              placeholder="поиск по названию"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
          <div className={filterStyles["filter-select"]}>
            <Select
              title="жанр"
              activeValue={activeGenres}
              items={genres}
              onSelectItem={setActiveGenres}
            />
          </div>
          <div className={filterStyles["filter-select"]}>
            <Select
              title="рейтинг"
              activeValue={activeRating}
              items={ratings}
              onSelectItem={setActiveRating}
            />
          </div>
          <div className={filterStyles["filter-select"]}>
            <Select
              title="год"
              activeValue={activeYear}
              items={years}
              onSelectItem={setActiveYear}
            />
          </div>
          <div className={filterStyles["filter-button"]}>
            <Button title="найти" onClick={handleSearchClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
