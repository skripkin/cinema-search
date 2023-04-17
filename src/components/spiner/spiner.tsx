import spinerStyles from "./spiner.module.css";

const Spiner = () => {
  return (
    <div className={spinerStyles["lds-ring"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spiner;
