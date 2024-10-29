'use client';

const RadioButtons = ({
  labels,
  name,
  divClasses,
  labelClasses,
  inputClasses,
  inputType,
  onChange,
}) => {
  return (
    <div className={divClasses}>
      {labels?.map((label) => (
        <label
          key={label}
          className={`${
            inputType === label.toLowerCase() && 'bg-red-500 text-white'
          } ${labelClasses}`}>
          <span>{label}</span>
          <input
            type='radio'
            name={name}
            className={`m-2 ${inputClasses}`}
            value={label.toLowerCase()}
            checked={inputType === label.toLowerCase() && 'checked'}
            onChange={onChange}
          />
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;
