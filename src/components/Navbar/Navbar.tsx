"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ["Home", "Characters", "Episodes", "Locations"];

  return (
    <nav className="relative w-screen">
      <div className="flex items-center justify-between w-full h-32 px-0">
        <div className="flex items-center">
          <Image
            src="/logo2.png"
            alt="Logo"
            height={128}
            width={300}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        <div className="md:hidden mr-10">
          <BurgerMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
        </div>

        <ul
          className={`flex flex-col md:flex-row items-center text-2xl gap-8
            ${menuOpen ? "fixed bg-opacity-80 inset-0 bg-black text-white justify-center z-50 " : "hidden md:flex md:relative md:bg-transparent md:text-blue-400 mr-10"}
          `}
          onClick={() => setMenuOpen(false)}
        >
          {navLinks.map((link, index) => (
            <li key={index} className="group relative">
              <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-[1000ms] ease-in-out w-0 h-0 group-hover:w-32 group-hover:h-32 z-10">
                <Image
                  src="/portal-rick-and-morty-png-2.gif"
                  alt="Black Hole"
                  width={128}
                  height={128}
                  unoptimized
                />
              </div>
              <Link
                href={`/${link.toLowerCase()}`}
                className="nav_link relative inline-block p-4 transition-transform duration-1000 ease-in-out group-hover:scale-75 group-hover:animate-pulse z-20 text-blue-400 group-hover:animate-pulse-colors text-shadow-md"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
