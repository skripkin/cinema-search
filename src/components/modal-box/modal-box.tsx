import { ReactNode } from "react";
import modalBoxStyles from "./modal-box.module.css";
import { Icons } from "..";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalBox = ({ isOpen, onClose, children }: IModalProps) => {
  return isOpen ? (
    <div>
      <div className={modalBoxStyles.wrapper} onClick={onClose} />
      <div className={modalBoxStyles.container}>
        <button className={modalBoxStyles.close} onClick={onClose}>
          <Icons.Cross />
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default ModalBox;
