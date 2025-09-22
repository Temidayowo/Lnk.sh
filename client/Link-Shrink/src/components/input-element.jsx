const InputElement = ({
  children,
  placeholder,
  type,
  value,
  onChange,
  isReadOnly,
  disabled,
}) => {
  return (
    <div className="flex items-center h-[40px] w-full max-w-[500px] m-auto border border-gray-300 rounded-md overflow-hidden">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={isReadOnly}
        disabled={disabled}
        className="h-full w-full px-3 text-sm text-gray-700 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      {children && (
        <div className="flex items-center justify-center h-full px-3 cursor-pointer border-l border-l-gray-300 bg-gray-100 hover:bg-gray-200 text-[#374151]">
          {children}
        </div>
      )}
    </div>
  );
};

export default InputElement;
