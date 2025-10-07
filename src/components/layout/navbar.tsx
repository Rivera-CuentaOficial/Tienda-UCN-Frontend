"use client";

import { LogOutIcon, MenuIcon, UserIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button, Skeleton } from "@/components/ui";
import { useAuth } from "@/hooks/api";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { isAuthenticated, isLoading, logoutAsync } = useAuth();

  const handleLogout = async () => {
    setLogoutLoading(true);
    await logoutAsync();
  };

  return (
    <nav className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="font-bold text-2xl">IDWM</div>

        <ul className="hidden md:flex space-x-8 font-medium items-center">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/products">Productos</Link>
          </li>
          {isLoading ? (
            <li>
              <Skeleton className="h-10 w-32 rounded-full" />
            </li>
          ) : isAuthenticated ? (
            <>
              <li>
                <Button
                  onClick={() => handleLogout()}
                  disabled={logoutLoading}
                  className={`relative flex items-center bg-red-600 hover:bg-red-500 rounded-full p-2 transition ${
                    logoutLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <LogOutIcon className="h-5 w-5" />
                  {logoutLoading ? "Cerrando..." : "Cerrar sesión"}
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth/register">Registrarse</Link>
              </li>
              <li>
                <Link href="/auth/verify-email">Verificar Correo</Link>
              </li>
              <li>
                <Link href="/auth/login">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                    <UserIcon /> Iniciar sesión
                  </Button>
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-blue-950 text-white space-y-4 py-4">
          <ul className="text-center space-y-2">
            <li>
              <Link href="/" onClick={toggleMenu}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/products" onClick={toggleMenu}>
                Productos
              </Link>
            </li>
            {isLoading ? (
              <li>
                <Skeleton className="h-10 w-32 rounded-full" />
              </li>
            ) : isAuthenticated ? (
              <>
                <li>
                  <Button
                    onClick={() => handleLogout()}
                    disabled={logoutLoading}
                    className={`relative flex items-center bg-red-600 hover:bg-red-500 rounded-full p-2 transition ${
                      logoutLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    <LogOutIcon className="h-5 w-5" />
                    {logoutLoading ? "Cerrando..." : "Cerrar sesión"}
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/auth/register">Registrarse</Link>
                </li>
                <li>
                  <Link href="/auth/verify-email">Verificar Correo</Link>
                </li>
                <li>
                  <Link href="/auth/login">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                      <UserIcon /> Iniciar sesión
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};
