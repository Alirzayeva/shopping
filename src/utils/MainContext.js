import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MainContext = createContext();

export const MyContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const totalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    setCartCount(totalCount);
  }, [cart]);

  useEffect(()=>{
    const localData = JSON.parse(localStorage.getItem("cart"));
    if(localData !==null){
      setCart(localData);
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart))
  },[cart]);

  const getData = async () => {
    await axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToCart = (newProduct) => {
    const checkExisting = cart.find((product) => product.id === newProduct.id);
    if (checkExisting) {
      const nonExisting = cart.filter(
        (product) => product.id !== newProduct.id
      );
      setCart(() => [
        ...nonExisting,
        { ...checkExisting, quantity: checkExisting.quantity + 1 },
      ]);
    } else {
      setCart((prev) => [
        ...prev,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  };

  const removeProduct = (productID) => {
    const deletedItem = cart.filter((item) => item.id !== productID);
    setCart(deletedItem);
  };

  const globalStates = {
    //
    products,
    setProducts,
    cart,
    setCart,
    cartCount,
    setCartCount,
    //
    addToCart,
    removeProduct,
  };

  return (
    <MainContext.Provider value={globalStates}>{children}</MainContext.Provider>
  );
};
