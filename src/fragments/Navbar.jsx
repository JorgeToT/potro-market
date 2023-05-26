"use client";

import Image from "next/image";
import logo from "@img/logo-sm.png";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar() {
  const logout = async () => {
    const response = await axios.post("/api/logout");
    if (response.status === 200) {
      window.location.href = "/login";
    }
  };

  const [profile, setProfile] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/getprofile").then((response) => {
      setProfile(response.data);
    });
  }, []);

  return (
    <nav className="p-6 bg-white text-black text-lg font-semibold">
      <div className="flex justify-between items-center">
        <div>
          <Image src={logo} alt="Logo" width={150} priority={true} />
        </div>
        <div className="px-5">
          <a href="/home">Página principal</a>
        </div>
        <div className="px-5">
          <a href="/posts/buy">Cart</a>
        </div>
        <div className="px-5">
          <a href="/profile/create">Crear publicación</a>
        </div>
        <div className="px-5">
          <a href="/profile">
            Perfil<p className="text-xs">{profile}</p>
          </a>
        </div>
        <div className="px-5">
          <input
            type="button"
            value="Cerrar sesión"
            className="cursor-pointer min-w-full bg-lime-700 p-3 rounded-3xl text-white"
            onClick={logout}
          />
        </div>
      </div>
    </nav>
  );
}
