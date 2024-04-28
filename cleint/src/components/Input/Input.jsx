const Input = ({
  value = "",
  onChange = () => {},
  placeholder = "",
  type = "text",
  name,
  className = "",
}) => {
  return (
    <input
      style={
        className
          ? {
              padding: ".8rem 3.2rem",
            }
          : {}
      }
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      required
      className={className || ""}
      name={name}
    />
  );
};

export default Input;
