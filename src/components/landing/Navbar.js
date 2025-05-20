"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from "react"
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeLink, setActiveLink] = useState("/")

    useEffect(() => {
        if (typeof window !== "undefined") {
            setActiveLink(window.location.pathname)
        }
    }, [])

    const menuLinks = [
        { href: '/', label: 'Beranda' },
        { href: '/about', label: 'Sejarah' },
        { href: '#events', label: 'Kegiatan' },
        { href: '#facilities', label: 'Fasilitas' },
        { href: '/berita', label: 'Berita' },
    ];

    return (
        <header className="font-main border-b border-gray-200 bg-[#FAFAFA] backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-700 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <div className="mx-auto">
                <div className="flex h-[80px] justify-between px-6 lg:px-[86px]">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <Image
                                src="/images/logo-baitana-temp.png"
                                alt="Logo Baitana"
                                width={120}
                                height={120}
                                className="w-40 md:w-56 h-auto"
                                priority
                            />
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <nav className="hidden md:flex items-center space-x-6 h-full">
                            {menuLinks.map((link, index) => (
                                <div key={index} className="h-full flex items-center relative group px-3">
                                    <Link key={index} href={link.href} className="relative text-[16px] font-normal text-gray-700 hover:text-[#2C3E9E] hover:bg-gray-200 rounded-lg dark:text-gray-200 dark:hover:text-blue-500 px-2">
                                       <span className="relative z-10">{link.label}</span>
                                    </Link>
                                    {/* Underline at the bottom border of navbar */}
                                    <span
                                        className={`absolute bottom-[-1px] left-0 h-1 rounded-3xl bg-[#2C3E9E] transition-all duration-300 ${activeLink === link.href ? "w-full" : "group-hover:w-0"}`}
                                    ></span>
                                </div>
                            ))}
                        </nav>
                        {/* Actions */}
                        <div className="pl-14">
                            {/* Theme Toggle - You can implement your own theme toggle here */}

                            <div className="hidden md:flex items-center space-x-3">
                                <Link href="/auth/login">
                                    <button className="rounded-[24px] bg-[#2C3E9E] px-4 py-2 text-sm font-medium text-white hover:bg-[#3f51b5] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600 cursor-pointer">
                                        Masuk / Daftar
                                    </button>
                                </Link>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-500"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? (
                                    <X className="h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Menu className="h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                    <div className="space-y-1 px-6 py-3">
                        {menuLinks.map((link, index) => (
                            <Link key={index} href={link.href} onClick={() => setIsMenuOpen(false)} className="block py-2 text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500">
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
                            <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                                <button className="w-full flex items-center justify-center rounded-md bg-[#2C3E9E] px-4 py-2 text-base font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                                    Masuk / Daftar
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}