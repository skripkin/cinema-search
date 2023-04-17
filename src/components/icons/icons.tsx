import iconsStyles from "./icons.module.css";

export const DownArrow = () => {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 8L9.33013 0.5H0.669873L5 8Z" fill="#D9D9D9" />
    </svg>
  );
};

export const RightArrow = () => {
  return (
    <svg
      width="36"
      height="16"
      viewBox="0 0 36 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.7071 7.29289C36.0976 7.68341 36.0976 8.31658 35.7071 8.7071L29.3431 15.0711C28.9526 15.4616 28.3195 15.4616 27.9289 15.0711C27.5384 14.6805 27.5384 14.0474 27.9289 13.6569L33.5858 8L27.9289 2.34314C27.5384 1.95262 27.5384 1.31945 27.9289 0.92893C28.3195 0.538405 28.9526 0.538405 29.3431 0.92893L35.7071 7.29289ZM-8.74228e-08 7L35 7L35 9L8.74228e-08 9L-8.74228e-08 7Z"
        fill="black"
      />
    </svg>
  );
};

export const Cross = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.625 19.9L9.825 11.7L17.975 19.9L19.325 18.55L11.125 10.3L19.325 2.05L17.975 0.699999L9.825 8.95L1.625 0.699999L0.275 2.05L8.475 10.3L0.275 18.55L1.625 19.9Z"
        fill="black"
      />
    </svg>
  );
};

export const BurgerMenu = ({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <button
      className={`${iconsStyles.container} ${open ? iconsStyles.change : ""}`}
      onClick={handleClick}
    >
      <div className={iconsStyles.topLine}></div>
      <div className={iconsStyles.middleLine}></div>
      <div className={iconsStyles.bottomLine}></div>
    </button>
  );
};
