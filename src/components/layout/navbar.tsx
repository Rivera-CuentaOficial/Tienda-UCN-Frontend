"use client";

import {
  ChevronDownIcon,
  EditIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { Button, Skeleton } from "@/components/ui";
import { useLogoutMutation } from "@/hooks/api";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { mutateAsync: logoutAsync, isPending: isLoggingOut } =
    useLogoutMutation();
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logoutAsync();
  };

  return (
    <nav className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="font-bold text-2xl">IDWM</div>

        <div className="hidden md:flex flex-1 justify-between items-center ml-8">
          <ul className="flex space-x-8 font-medium">
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/products">Productos</Link>
            </li>
          </ul>

          <ul className="flex space-x-4 font-medium items-center">
            {isLoading ? (
              <li>
                <div className="h-9 w-36 bg-gray-300 rounded-full" />
              </li>
            ) : isAuthenticated ? (
              <li className="relative">
                <Button
                  onClick={toggleDropdown}
                  className="relative flex items-center bg-blue-600 hover:bg-blue-700 rounded-full p-2 px-4 transition cursor-pointer"
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  Mi cuenta
                  <ChevronDownIcon className="h-4 w-4 ml-2" />
                </Button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      href="#"
                      className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <EditIcon className="h-4 w-4 mr-2" />
                      Editar perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className={`w-full flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 transition ${
                        isLoggingOut
                          ? "opacity-70 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li>
                  <Link href="/auth/login">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full cursor-pointer">
                      <UserIcon className="h-5 w-5 mr-2" />
                      Iniciar sesión
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:text-gray-200">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

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
                  <Link href="#" onClick={toggleMenu} className="block py-2">
                    Editar perfil
                  </Link>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    disabled={isLoggingOut}
                    className={`relative flex items-center bg-red-600 hover:bg-red-500 rounded-full p-2 transition ${
                      isLoggingOut
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <LogOutIcon className="h-5 w-5 mr-2" />
                    {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/auth/register" onClick={toggleMenu}>
                    Registrarse
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" onClick={toggleMenu}>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                      <UserIcon className="h-5 w-5 mr-2" />
                      Iniciar sesión
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
