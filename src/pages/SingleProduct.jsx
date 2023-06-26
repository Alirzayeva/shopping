import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MainContext } from "../utils/MainContext";
const SingleProduct = () => {
  const { addToCart } = useContext(MainContext);
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    getSingleProduct();
  }, []);

  // useEffect(() => {
  //   try {
  //      axios
  //       .get(`http://localhost:5000/api/products/${id}`)
  //       .then((res) => {
  //         setData(res.data);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }  }, [data, setData, id]);


  const getSingleProduct = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/products/${id}`)
        .then((res) => {
          setData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="singleProduct">
      <div className="container">
        <div className="row">
          <h2>Single Product</h2>
          <div className="productDetails">
            <div className="leftSide">
              <img
                src={`http://localhost:5000/${data?.productImage}`}
                alt={data?.name}
              />
            </div>
            <div className="rightSide">
              <h2 className="title">{data?.name}</h2>
              <p className="details">{data?.details}</p>
              <span className="price">{data?.price}</span>
              <button
                onClick={() => {
                  addToCart(data);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
