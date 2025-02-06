import { useEffect, useState } from "react";
import { FaAlignRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Services", href: "services" },
    { label: "About", href: "about" },
    { label: "Work", href: "work" },
    { label: "Testimonials", href: "testimonials" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-1000 bg-[#10032F]  `}
    >
      <div className="container mx-auto px-6  py-6">
        <div className="flex items-center justify-between ">
          {/* Logo Section */}
          <div className="flex-1">
            <Link
              href="#home"
              className="text-2xl font-bold text-white cursor-pointer uppercase"
            >
              <span className="text-white">Spac</span>
              <span className="text-green-600">enus</span>
            </Link>
          </div>

          {/* Navigation Items - Center */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={`#${item.href}`}
                className="text-white hover:text-green-400 transition-colors cursor-pointer font-inherit"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="text-white hover:text-green-400 transition-colors cursor-pointer"
            >
              Contact
            </Link>
          </div>

          {/* Get Started Button Section */}
          <div className="hidden md:flex flex-1 justify-end items-center space-x-8">
            <Link href="#get-started">
              <Button className="bg-green-600 text-white px-6 py-2  hover:bg-white hover:text-black  rounded">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? (
                <RxCross2 className="h-6 w-6" />
              ) : (
                <FaAlignRight className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4 p-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={`#${item.href}`}
                  className="text-white hover:text-green-400 transition-colors cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="text-white hover:text-green-400 transition-colors cursor-pointer"
              >
                Contact
              </Link>
              <Link href="##get-started">
                <Button className="bg-green-600 text-white px-6 py-2  hover:bg-white hover:text-black  cursor-pointer rounded">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
