"use client";

import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlineUserGroup,
} from "react-icons/hi";
import Link from "next/link";

const links = [
  {
    id: 1,
    name: "Strona Główna",
    to: "/",
    icon: HiOutlineHome,
  },
  {
    id: 2,
    name: "Wyszukaj Utwór",
    to: "/",
    icon: HiOutlineHashtag,
  },
  {
    id: 3,
    name: "Top Artyści",
    to: "/",
    icon: HiOutlineUserGroup,
  },
  {
    id: 4,
    name: "Top Gatunek",
    to: "/",
    icon: HiOutlineUserGroup,
  },
];

const logo = "../logo512.png";

const NavLinks = ({ handleClick }: { handleClick?: () => void }) => {
  return (
    <div className="mt-10">
      {links.map((link) => {
        return (
          <Link
            key={link.id}
            href={link.to}
            onClick={() => handleClick && handleClick()}
            className="flex flex-row justify-start items-center my-8  font-semibold text-gray-200 hover:text-purple-400"
          >
            <link.icon className="w-6 h-6 mr-2" />
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex justify-start items-center hidden flex-col w-full h-full py-10 px-4 bg-gradient-to-b from-[#0f091b] via-[#260e41] to-[#06010c] shadow-[inset_20px_0_20px_-5px_rgba(0,0,0,0.8)]">
        <img src={logo} alt="logo" className="w-3/5 object-contain" />
        <NavLinks />
      </div>
      <div className="absolute md:hidden block top-6 left-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            onClick={() => setMobileMenuOpen(false)}
            className="w-6 h-6 text-white mr-2"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenuOpen(true)}
            className="w-6 h-6 text-white mr-2"
          />
        )}
      </div>
      {/* <div
        className={`fixed top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div> */}
    </>
  );
};

export default Navbar;
