import React, { useEffect, useState, useContext } from "react";
import { MainContext } from "../utils/MainContext";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cart, setCart, removeProduct } = useContext(MainContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let sum = cart.map((product) => {
      return product.price * product.quantity;
    });
    let sumPrice = sum.reduce((acc, curr) => acc + curr, 0);
    setTotalPrice(sumPrice);
  }, [cart]);

  const increment = (product) => {
    const exitingProduct = cart.find((item) => item.id === product.id);
    if (exitingProduct) {
      const updateCart = cart.map((data) => {
        if (data.id === exitingProduct.id) {
          return {
            ...data,
            quantity: exitingProduct.quantity + 1,
          };
        } else {
          return data;
        }
      });
      setCart(updateCart);
    }
  };

  const decrement = (product) => {
    const exitingProduct = cart.find((item) => item.id === product.id);
    if (exitingProduct) {
      const updateCart = cart.map((data) => {
        if (data.id === exitingProduct.id && data.quantity > 1) {
          return {
            ...data,
            quantity: exitingProduct.quantity - 1,
          };
        } else {
          return data;
        }
      });
      setCart(updateCart);
    }
  };

  return (
    <section className="cart">
      <div className="container">
        <div className="row">
          <h2 className="cartTitle">My Cart</h2>
          <table>
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Name</th>
                <th>Details</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item) => {
                return (
                  <tr key={item?.id}>
                    <td>
                      <img
                        src={`http://localhost:5000/${item?.productImage}`}
                        alt={item?.name}
                      />
                    </td>
                    <td>{item?.name}</td>
                    <td>{item?.details}</td>
                    <td>
                      <div className="symbols">
                        <span
                          className="plus"
                          onClick={() => {
                            increment(item);
                          }}
                        >
                          +
                        </span>
                        <span className="count">{item?.quantity}</span>
                        <span
                          className="minus"
                          onClick={() => {
                            decrement(item);
                          }}
                        >
                          -
                        </span>
                      </div>
                    </td>
                    <td>{item?.price}$</td>
                    <td>
                      <div
                        className="delete"
                        onClick={() => {
                          removeProduct(item?.id);
                        }}
                      >
                        <FaTrash />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="checkout">
            <span>Total: {totalPrice} $</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
