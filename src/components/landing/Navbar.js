"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // menggunakan icon dari lucide-react

export default function Navbar({ className }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`${className} py-10 px-6 md:px-[180px] bg-transparent`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl text-white">
          <Image
            src="/images/logo.png"
            alt="Logo Masjid Al Khandari"
            width="200"
            height="40"
          />
        </Link>

        {/* Toggle Button - Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-[#0c0c0c] text-white md:static md:flex md:items-center md:w-auto md:bg-transparent z-20`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-14 p-4 md:p-0 items-center">
            <li>
              <Link
                href="/"
                className="block py-2 hover:text-blue-200"
                onClick={() => setIsOpen(false)}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="#features"
                className="block py-2 hover:text-blue-200"
                onClick={() => setIsOpen(false)}
              >
                Fitur
              </Link>
            </li>
            <li>
              <Link
                href="#activities"
                className="block py-2 hover:text-blue-200"
                onClick={() => setIsOpen(false)}
              >
                Kegiatan
              </Link>
            </li>
            <li>
              <Link
                  href="#gallery"
                  className="block py-2 hover:text-blue-200"
                  onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="#contacts"
                className="block py-2 hover:text-blue-200"
                onClick={() => setIsOpen(false)}
              >
                Kontak
              </Link>
            </li>
            <li className="w-full flex justify-center md:w-auto md:block">
              <Link
                href="/auth/login"
                className="bg-white text-green-900 text-sm hover:bg-green-100 py-1.5 px-5 rounded-md flex items-center justify-center gap-2 transition duration-300"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
