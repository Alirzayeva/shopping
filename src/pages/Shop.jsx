import React, {useContext} from "react";
import { MainContext } from "../utils/MainContext";
import Card from "../components/Card";
const Shop = () => {
  const { products } = useContext(MainContext);
  return (
    <section className="shop">
      <div className="container">
        <div className="cardBox">
          {products.map(( item ) => {
            return <Card key={ item.id }  data={ item }/>;
          })}
        </div>
      </div>
    </section>
  );
};

export default Shop;
