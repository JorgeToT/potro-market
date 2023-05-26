"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import logo from "@img/logo-sm.png";

export default function Page() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorForm, setErrorForm] = useState(false);

  const validateLogin = (email, password) => {
    let emailRegex = /^(([a-zA-Z]+)([0-9]{3})@([a-zA-Z]+)\.([a-zA-Z]+)\.([a-zA-Z]{2}))$/;
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return emailRegex.test(email) && passwordRegex.test(password) ? true : false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateLogin(credentials.email, credentials.password)) {
      setErrorForm(false);
      const response = await axios.post("/api/login", credentials);
      if (response.status === 200) {
        window.location.href = "/home";
      } else {
        setErrorForm(true);
      }
    } else {
      setErrorForm(true);
    }
    setCredentials({
      email: "",
      password: "",
    });
  };

  return (
    <div className="justify-center items-center min-h-screen text-2xl flex flex-col space-y-8">
      <div className="grid gap-y-6 bg-white text-black rounded-3xl w-1/3 max-w-xl px-14 py-6">
        <Image
          src={logo}
          width={200}
          priority={true}
          alt="Potro Mercado"
          className="justify-self-center mb-4"
        />
        <h3 className="font-semibold">Iniciar sesión</h3>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-base">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={(event) => {
              setCredentials({
                ...credentials,
                email: event.target.value,
              });
            }}
            autoComplete="off"
            className={`text-black text-sm p-2 border-solid border rounded-xl ${
              errorForm ? "border-red-600" : "border-black"
            }`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-base">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={(event) => {
              setCredentials({
                ...credentials,
                password: event.target.value,
              });
            }}
            autoComplete="off"
            className={`text-black text-sm p-2 border-solid border rounded-xl ${
              errorForm ? "border-red-600" : "border-black"
            }`}
          />
        </div>
        {errorForm ? (
          <label htmlFor="" className="text-red-600 text-sm">
            Correo electrónico o contraseña inválidos
          </label>
        ) : null}
        <div className="text-sm">
          <a href="" className="text-lime-700">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div>
          <input
            type="button"
            value="Iniciar sesión"
            className="cursor-pointer min-w-full bg-lime-700 p-2 rounded-3xl text-white"
            onClick={handleSubmit}
          />
        </div>
        <div className="text-sm">
          ¿Eres nuevo?{" "}
          <a href="/register" className="text-lime-700">
            Registrate
          </a>
        </div>
      </div>
    </div>
  );
}
