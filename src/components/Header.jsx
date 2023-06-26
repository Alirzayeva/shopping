import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MainContext } from "../utils/MainContext";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, cartCount, removeProduct } = useContext(MainContext);
  return (
    <header className="header">
      <div
        className={isOpen ? "overlay active" : "overlay"}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      <div className="container">
        <div className="logo">
          <Link to="/">Sneakers Shopping</Link>
        </div>
        <nav className="navBar">
          <ul className="navList">
            <li className="navItem">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/shop">Shop</NavLink>
            </li>
          </ul>
        </nav>
        <div className="cardHed">
          <FaShoppingCart
            className="cartIcon"
            onClick={() => setIsOpen(!isOpen)}
          />
          <span className="cartCount">{cartCount}</span>
          <div className={isOpen ? "hdn active" : "hdn"}>
            <ul className="cartList">
              {cart?.length === 0 ? <p>Cart is empty</p> : null}
              {cart?.map((item) => {
                return (
                  <li className="cartItem" key={(item.id)}>
                    <div className="itemImg">
                      <img
                        src={`http://localhost:5000/${item?.productImage}`}
                        alt={item?.name}
                      />
                    </div>
                    <div className="itemInfo">
                      <h3 className="itemTitle">{item?.name}</h3>
                      <p className="itemDetails">{item?.details}</p>
                      <span className="itemPrice">{item?.price}$</span>
                    </div>
                    <div
                      className="deleteIcon"
                      onClick={() => {
                        removeProduct(item?.id);
                      }}
                    >
                      <FaTrash />
                    </div>
                  </li>
                );
              })}
              {cart?.length === 0 ? null : (
                <Link className="viewCart" to="/cart">
                  View cart
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
