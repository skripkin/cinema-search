import cardStyles from "./card.module.css";

interface ICardProps {
  id: string;
  poster: string;
  title: string;
  year: number;
  rating: number;
  onMoveClick: (id: string) => void;
}

const Card = ({ id, poster, title, year, rating, onMoveClick }: ICardProps) => {
  return (
    <button className={cardStyles.container} onClick={() => onMoveClick(id)}>
      <img className={cardStyles.poster} src={poster} alt={title} />
      <p className={cardStyles.title}>{title}</p>
      <p className={cardStyles.year}>{year}</p>
      <span className={cardStyles.rating}>{rating}</span>
    </button>
  );
};

export default Card;
