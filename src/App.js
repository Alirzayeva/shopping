import { Route, Routes } from "react-router-dom";

//Scss Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";

//Scss Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import NotFound from "./pages/NotFound";
//

import "./assets/scss/index.scss";
import { MyContext } from "./utils/MainContext";
const App = () => {
  return (
    <MyContext>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details/:id" element={<SingleProduct />} />
        <Route path="/card" element={<Card />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </MyContext>
  );
};

export default App;
