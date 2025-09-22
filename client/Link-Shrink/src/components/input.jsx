import InputElement from "./input-element";

const Input = ({ children, placeholder, type }) => {
  return (
    <div className="m-7 flex justify-center">
      <InputElement
        placeholder={placeholder}
        type={type}
        children={children}
      ></InputElement>
    </div>
  );
};

export default Input;
