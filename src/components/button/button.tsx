import buttonStyles from "./button.module.css";

interface IButtonProps {
  title: string;
  onClick: () => void;
}

const Button = ({ title, onClick }: IButtonProps) => {
  return (
    <button className={buttonStyles.button} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
