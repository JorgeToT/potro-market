"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import logo from "@img/logo-sm.png";

export default function Page() {
  const [credentials, setCredentials] = useState({
    name: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirmed: "",
  });

  const [invalidName, setInvalidName] = useState(false);
  const [invalidMiddleName, setInvalidMiddleName] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidPasswordConfirmed, setInvalidPasswordConfirmed] = useState(false);

  const validateName = (name) => {
    return name != "";
  };

  const validateMiddleName = (middleName) => {
    return middleName != "";
  };

  const validateLastName = (lastName) => {
    return lastName != "";
  };

  const validatePhone = (phone) => {
    let phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    let emailRegex = /^(([a-zA-Z]+)([0-9]{3})@([a-zA-Z]+)\.([a-zA-Z]+)\.([a-zA-Z]{2}))$/;
    return emailRegex.test(email) && email != "";
  };

  const validatePassword = (password) => {
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePasswordConfirmed = (password, passwordConfirmed) => {
    return password === passwordConfirmed;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    validateName(credentials.name) ? setInvalidName(false) : setInvalidName(true);
    validateMiddleName(credentials.middleName)
      ? setInvalidMiddleName(false)
      : setInvalidMiddleName(true);
    validateLastName(credentials.lastName) ? setInvalidLastName(false) : setInvalidLastName(true);
    validatePhone(credentials.phone) ? setInvalidPhone(false) : setInvalidPhone(true);
    validateEmail(credentials.email) ? setInvalidEmail(false) : setInvalidEmail(true);
    validatePassword(credentials.password) ? setInvalidPassword(false) : setInvalidPassword(true);
    validatePasswordConfirmed(credentials.password, credentials.passwordConfirmed)
      ? setInvalidPasswordConfirmed(false)
      : setInvalidPasswordConfirmed(true);
    if (
      validateName(credentials.name) &&
      validateMiddleName(credentials.middleName) &&
      validateLastName(credentials.lastName) &&
      validateEmail(credentials.email) &&
      validatePhone(credentials.phone) &&
      validatePassword(credentials.password) &&
      validatePasswordConfirmed(credentials.password, credentials.passwordConfirmed)
    ) {
      const response = await axios.post("/api/register", credentials);
      response.status === 200 ? (window.location.href = "/login") : null;
    } else {
      return;
    }
  };

  return (
    <div className="justify-center items-center min-h-screen text-2xl flex flex-col space-y-8">
      <div className="grid gap-y-5 bg-white text-black rounded-3xl w-1/3 max-w-xl px-14 py-6">
        <Image
          src={logo}
          width={200}
          priority={true}
          alt="Potro Mercado"
          className="justify-self-center mb-4"
        />
        <h3 className="font-semibold">Registrate</h3>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-base">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={credentials.name}
            onChange={(event) => {
              setCredentials({ ...credentials, name: event.target.value });
            }}
            autoComplete="off"
            className={`text-black text-sm p-2 border-solid border rounded-xl ${
              invalidName ? "border-red-600" : "border-black"
            }`}
          />
          {invalidName ? (
            <label htmlFor="email" className="text-red-600 text-sm">
              Este campo es necesario
            </label>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="middleName" className="text-base">
            Apellido Paterno
          </label>
          <input
            type="text"
            name="middleName"
            value={credentials.middleName}
            onChange={(event) => {
              setCredentials({ ...credentials, middleName: event.target.value });
            }}
            autoComplete="off"
            className={`text-black text-sm p-2 border-solid border rounded-xl ${
              invalidMiddleName ? "border-red-600" : "border-black"
            }`}
          />
          {invalidMiddleName ? (
            <label htmlFor="email" className="text-red-600 text-sm">
              Este campo es necesario
            </label>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-base">
            Apellido Materno
          </label>
          <input
            type="text"
            name="lastName"
            value={credentials.lastName}
            onChange={(event) => {
              setCredentials({ ...credentials, lastName: event.target.value });
            }}
            autoComplete="off"
            className={`text-black text-sm p-2 border-solid border rounded-xl ${
              invalidLastName ? "border-red-600" : "border-black"
            }`}
          />
          {invalidLastName ? (
            <label htmlFor="email" className="text-red-600 text-sm">
              Este campo es necesario
            </label>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-base">
            Número de teléfono
          </label>
          <input
            type="text"
            name="phone"
            value={credentials.phone}
            onChange={(event) => {
              setCredentials({ ...credentials, phone: event.target.value });
            }}
            autoComplete="off"
            className={`text-black text-sm p-2 border-solid border rounded-xl ${
              invalidPhone ? "border-red-600" : "border-black"
            }`}
          />
          {invalidPhone ? (
            <label htmlFor="email" className="text-red-600 text-sm">
              Número de teléfono inválido
            </label>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-base">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={(event) => {
              setCredentials({ ...credentials, email: event.target.value });
            }}
            autoComplete="off"
            className={`text-black text-sm p-2 border-solid border rounded-xl ${
              invalidEmail ? "border-red-600" : "border-black"
            }`}
          />
          <label htmlFor="email" className="text-xs">
            Debe de ser tu correo institucional
          </label>
          {invalidEmail ? (
            <label htmlFor="email" className="text-red-600 text-sm">
              Correo institucional inválido
            </label>
          ) : null}
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
              setCredentials({ ...credentials, password: event.target.value });
            }}
            autoComplete="off"
            className={`text-black text-sm p-2 border-solid border rounded-xl ${
              invalidPassword ? "border-red-600" : "border-black"
            }`}
          />
          <label htmlFor="password" className="text-xs">
            Debe de contener al menos: 8 caracteres, 1 letra, 1 número y 1 caracter especial
          </label>
          {invalidPassword ? (
            <label htmlFor="password" className="text-red-600 text-sm">
              Contraseña inválida
            </label>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="passwordConfirmed" className="text-base">
            Contraseña
          </label>
          <input
            type="password"
            name="passwordConfirmed"
            value={credentials.passwordConfirmed}
            onChange={(event) => {
              setCredentials({ ...credentials, passwordConfirmed: event.target.value });
            }}
            autoComplete="off"
            className={`text-black text-sm p-2 border-solid border rounded-xl ${
              invalidPasswordConfirmed ? "border-red-600" : "border-black"
            }`}
          />
          {invalidPasswordConfirmed ? (
            <label htmlFor="passwordConfirmed" className="text-red-600 text-sm">
              Las contraseñas no coinciden
            </label>
          ) : null}
        </div>
        <div>
          <input
            type="button"
            value="Registrarse"
            className="cursor-pointer min-w-full bg-lime-700 p-2 rounded-3xl text-white"
            onClick={handleRegister}
          />
        </div>
        <div className="text-sm">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-lime-700">
            Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
}
