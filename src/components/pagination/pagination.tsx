import paginationStyles from "./pagination.module.css";
import { Icons } from "..";

interface IPaginationProp {
  onPreviewClick: () => void;
  onNextClick: () => void;
}

const Pagination = ({ onPreviewClick, onNextClick }: IPaginationProp) => {
  return (
    <div className={paginationStyles.container}>
      <button
        className={`${paginationStyles.pagination} ${paginationStyles.preview}`}
        onClick={onPreviewClick}
      >
        <Icons.RightArrow />
        предыдущая
      </button>
      <button
        className={`${paginationStyles.pagination} ${paginationStyles.next}`}
        onClick={onNextClick}
      >
        <Icons.RightArrow />
        следующая
      </button>
    </div>
  );
};

export default Pagination;
