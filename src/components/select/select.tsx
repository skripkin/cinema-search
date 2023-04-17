import { useRef, useState } from "react";
import selectStyles from "./select.module.css";
import { Icons } from "..";
import useHandleOutsideClick from "../../hooks/useOutsideClick";

export type TSelectItem = {
  title: string;
  value: string;
};

interface ISelectProps {
  title?: string;
  activeValue?: TSelectItem;
  items: TSelectItem[];
  onSelectItem: (selectedValue: TSelectItem) => void;
}

const Select = ({ title, activeValue, items, onSelectItem }: ISelectProps) => {
  const [open, setOpen] = useState(false);
  const innerRef = useRef(null);
  useHandleOutsideClick(innerRef, open, () => setOpen(!open));

  const handleSelect = (item: TSelectItem) => {
    setOpen(false);
    onSelectItem(item);
  };

  return (
    <div ref={innerRef} className={selectStyles.general}>
      <label className={selectStyles.container} onClick={() => setOpen(!open)}>
        <input
          className={selectStyles.select}
          type="text"
          value={activeValue ? activeValue.title : title}
          disabled
          placeholder={title}
        />
        <button className={selectStyles.arrow}>
          <Icons.DownArrow />
        </button>
      </label>
      {open && (
        <ul className={selectStyles.items}>
          {items.map((item: TSelectItem, index: number) => (
            <li
              key={`${index}-${item.value}`}
              className={selectStyles.item}
              onClick={() => handleSelect(item)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
