import React from "react";

type Props = {
  onClick: () => void;
  className?: string;
};

export const Button: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  );
};

export default Button;
