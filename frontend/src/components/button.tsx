type ButtonType = {
  btnName: string;
  btnClassName: string;
  btnProps?: React.ComponentPropsWithoutRef<'button'>;
};

const Button = ({ btnName, btnClassName, btnProps }: ButtonType) => {
  return (
    <button className={`${btnClassName}`} {...btnProps}>
      {btnName}
    </button>
  );
};

export default Button;
