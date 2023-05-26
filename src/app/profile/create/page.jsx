"use client";

import axios from "axios";
import { useState } from "react";

export default function Page() {
  const [dataProduct, setDataProduct] = useState({
    title: "",
    price: "",
    description: "",
    published: true,
    categories: "",
  });

  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidPrice, setInvalidPrice] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dataProduct.title !== "" ? setInvalidTitle(false) : setInvalidTitle(true);
    dataProduct.price !== "" ? setInvalidPrice(false) : setInvalidPrice(true);
    dataProduct.description !== "" ? setInvalidDescription(false) : setInvalidDescription(true);
    dataProduct.categories = dataProduct.categories.split(",");
    while (dataProduct.categories.length <= 3) {
      dataProduct.categories.push("");
    }

    if (dataProduct.title !== "" && dataProduct.price !== "" && dataProduct.description !== "") {
      const response = await axios.post("/api/createpost", dataProduct);
      if (response.status === 200) {
        window.location.href = "/profile";
      }
    }
  };

  return (
    <div className="items-center min-h-screen text-2xl flex flex-col space-y-8 mt-14">
      <div className="grid gap-y-5 bg-white text-black rounded-3xl w-1/2 min-w-fit px-14 py-6">
        <div className="flex flex-col">
          <label htmlFor="middleName" className="text-base">
            Nombre del producto
          </label>
          <input
            type="text"
            name="title"
            value={dataProduct.title}
            onChange={(event) => {
              setDataProduct({ ...dataProduct, title: event.target.value });
            }}
            autoComplete="off"
            className={`text-black text-sm p-2 border-solid border rounded-xl ${
              invalidTitle ? "border-red-600" : "border-black"
            }`}
          />
          {invalidTitle ? (
            <label htmlFor="title" className="text-red-600 text-sm">
              Este campo es necesario
            </label>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="middleName" className="text-base">
            Precio del producto
          </label>
          <input
            type="text"
            name="price"
            value={dataProduct.price}
            onChange={(event) => {
              setDataProduct({ ...dataProduct, price: event.target.value });
            }}
            autoComplete="off"
            className={`text-black text-sm p-2 border-solid border rounded-xl ${
              invalidPrice ? "border-red-600" : "border-black"
            }`}
          />
          {invalidPrice ? (
            <label htmlFor="title" className="text-red-600 text-sm">
              Este campo es necesario
            </label>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="middleName" className="text-base">
            Descripción
          </label>
          <textarea
            name="descripcion"
            rows="5"
            cols="60"
            value={dataProduct.description}
            onChange={(event) => {
              setDataProduct({ ...dataProduct, description: event.target.value });
            }}
            autoComplete="off"
            className={`text-black text-sm p-2 border-solid border rounded-xl ${
              invalidDescription ? "border-red-600" : "border-black"
            }`}
          ></textarea>
          {invalidDescription ? (
            <label htmlFor="title" className="text-red-600 text-sm">
              Este campo es necesario
            </label>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="middleName" className="text-base">
            Categorias
          </label>
          <input
            type="text"
            name="categories"
            value={dataProduct.categories}
            onChange={(event) => {
              setDataProduct({ ...dataProduct, categories: event.target.value });
            }}
            autoComplete="off"
            className="text-black text-sm p-2 border-solid border rounded-xl border-black"
          />
          <label htmlFor="email" className="text-xs">
            Poner categorias facilitara la busqueda de tu producto (separar por comas cada categoria
            y usa un máximo de 3)
          </label>
        </div>
        <div>
          <input
            type="button"
            value="Publicar"
            className="cursor-pointer min-w-full bg-lime-700 p-2 rounded-3xl text-white"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
