import classes from "./IconButton.module.css";

export default function IconButton({ image, onClick, children }) {
  const CustomSvg = image;
  return (
    <button className={classes.container} onClick={onClick}>
      <CustomSvg />
      {children}
    </button>
  );
}
