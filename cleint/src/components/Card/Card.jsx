const Card = ({ title, text1, text2, value }) => {
  return (
    <div className="card">
      <span className="button__span">
        <button>{title}</button>
      </span>
      <p>{text1} </p>
      {text2 && <p>{text2}</p>}
      <span className="value">{value}</span>
    </div>
  );
};

export default Card;
