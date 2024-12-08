type InputTypes = {
  labelName?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputProps?: React.ComponentPropsWithoutRef<'input'>;
};

const Input = ({ labelName, labelClassName, inputClassName, inputProps }: InputTypes) => {
  return (
    <div className="flex gap-3 justify-between items-center">
      <label className={`text-md font-bold ${labelClassName}`} htmlFor={inputProps?.name || inputProps?.id}>
        {labelName}
      </label>
      <input className={`rounded-md ${inputClassName}`} {...inputProps} />
    </div>
  );
};

export default Input;
