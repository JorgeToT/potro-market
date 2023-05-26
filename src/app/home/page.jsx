"use client";

import axios from "axios";
import Card from "@components/Card";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/getproducts").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="p-8">
      {products.map((product) => {
        return <Card props={product} key={product.id} />;
      })}
    </div>
  );
}
