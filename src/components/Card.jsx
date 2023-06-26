import React, { useContext } from "react";
import { MainContext } from "../utils/MainContext";
import { Link } from "react-router-dom";
const Card = ({ data }) => {
  const { addToCart } = useContext(MainContext);
  return (
    <Link to={`/details/${data?.id}`}>
      <div className="card">
        <div className="cardImg">
          <img
            src={`http://localhost:5000/${data?.productImage}`}
            alt={data?.name}
          />
        </div>
        <div className="cardInfo">
          <h4 className="cardTitle">{data?.name}</h4>
          <p className="cardDetails">{data?.details}</p>
          <span className="price">{data?.price}</span>
        </div>
        <div className="cardOverlay">
          <button
            className="btn"
            onClick={() => {
              addToCart(data);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
