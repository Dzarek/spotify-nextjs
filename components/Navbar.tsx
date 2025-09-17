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
import Image from "next/image";
// import { Luckiest_Guy } from "next/font/google";
import Title from "./Title";
import { usePathname } from "next/navigation";

// const luckiestGuy = Luckiest_Guy({
//   subsets: ["latin"],
//   weight: "400",
// });

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
    to: "/search",
    icon: HiOutlineHashtag,
  },
  {
    id: 3,
    name: "Top Artyści",
    to: "/artists",
    icon: HiOutlineUserGroup,
  },
  {
    id: 4,
    name: "Top Gatunek",
    to: "/gatunki",
    icon: HiOutlineUserGroup,
  },
];

const logo = "/logo512.png";

const NavLinks = ({ handleClick }: { handleClick?: () => void }) => {
  const pathname = usePathname();

  return (
    <div className="mt-10">
      {links.map((link) => {
        return (
          <Link
            key={link.id}
            href={link.to}
            onClick={() => handleClick && handleClick()}
            className={`flex flex-row justify-start items-center my-8 text-2xl md:text-xl font-semibold text-gray-200 duration-300 hover:text-purple-400 ${
              pathname === link.to && "text-purple-400 "
            }`}
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
        <Image
          src={logo}
          width={500}
          height={500}
          alt="logo"
          className="w-3/5 object-contain"
        />
        <Title title="MUSIC APP" styles=" text-2xl text-white" />
        <NavLinks />
      </div>
      <div className="absolute z-50 md:hidden block top-6 left-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 text-white mr-2"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenuOpen(true)}
            className="w-10 h-10 text-white mr-2"
          />
        )}
      </div>
      <div
        className={`fixed top-0 h-screen w-[80%] bg-gradient-to-tl from-white/5 to-[#100c33] backdrop-blur-lg z-10 p-6 pt-10 md:hidden duration-700 flex flex-col justify-start items-center ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <Image
          src={logo}
          width={500}
          height={500}
          alt="logo"
          className="w-3/5 object-contain"
        />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Navbar;
