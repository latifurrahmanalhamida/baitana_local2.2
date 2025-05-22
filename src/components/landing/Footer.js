"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Youtube, Instagram, Facebook, MessageSquare } from "lucide-react"


export default function Footer() {
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

    const socialLinks = [
        {
            href: "https://www.youtube.com/channel/masjid-baitana",
            label: "YouTube",
            icon: <Youtube className="w-6 h-6" />,
        },
        {
            href: "https://www.instagram.com/masjid_baitana",
            label: "Instagram",
            icon: <Instagram className="w-5 h-5" />,
        },
        {
            href: "https://www.facebook.com/masjidbaitana",
            label: "Facebook",
            icon: <Facebook className="w-5 h-5" />,
        },
    ];

    return (
        <>
            <section className="relative lg:h-[360px] text-white flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-90"></div>
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/landing/footer-background.png"
                        alt="Background Footer"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>

                <div className="relative z-10 text-white w-full">
                    <div className="px-6 lg:px-[86px] py-6 lg:py-0">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-12 md:h-[260px]">
                            <div className="w-full md:w-1/3">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center justify-center">
                                        <Link href="/">
                                            <Image
                                                src="/images/landing/logo-baitana-temp-white.png"
                                                alt="Logo Baitana"
                                                width={120}
                                                height={120}
                                                className="w-48 md:w-72 h-auto"
                                                priority
                                            />
                                        </Link>
                                    </div>
                                    <p className="text-sm text-justify">Baitana adalah masjid yang berkomitmen menjadi pusat ibadah, pembinaan umat, dan kegiatan sosial kemasyarakatan. Melalui program dakwah, pendidikan, serta kegiatan infaq dan sedekah, Baitana hadir untuk memberi manfaat bagi umat dan lingkungan sekitar.</p>
                                </div>
                            </div>
                            <div className="hidden md:block w-full md:w-1/3">
                                <div className="flex flex-col items-center md:items-start gap-2 md:gap-4 md:pl-40">
                                    <h1 className="text-[16px] md:text-xl font-bold">Menu</h1>
                                    <div className="flex flex-col gap-2 md:gap-4 text-center md:text-left">
                                        {menuLinks.map((link, index) => (
                                            <Link key={index} href={link.href} className="text-sm md:text-[16px] hover:text-blue-200">
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-2 md:gap-0 md:justify-between md:pl-10">
                                <h1 className="text-[16px] md:text-xl font-bold">Kontak Kami</h1>
                                <div className="flex flex-col items-center md:items-start gap-2 md:gap-4">
                                    <div className="flex items-center gap-1 md:gap-3">
                                        <MapPin className="w-4 md:w-5 h-4 md:h-5 text-blue-200" />
                                        <p className="text-sm md:text-[16px]">Jl. Masjid Raya No. 123, Jakarta Pusat</p>
                                    </div>
                                    <div className="flex items-center gap-1 md:gap-3">
                                        <Phone className="w-4 md:w-5 h-4 md:h-5 text-blue-200" />
                                        <p className="text-sm md:text-[16px]">+62 21 1234 5678</p>
                                    </div>
                                    <div className="flex items-center gap-1 md:gap-3">
                                        <MessageSquare className="w-4 md:w-5 h-4 md:h-5 text-blue-200" />
                                        <p className="text-sm md:text-[16px]">+62 812 3456 7890 (WhatsApp)</p>
                                    </div>
                                    <div className="flex items-center gap-1 md:gap-3">
                                        <Mail className="w-4 md:w-5 h-4 md:h-5 text-blue-200" />
                                        <a
                                            href="mailto:info@masjidbaitana.com"
                                            className="text-sm md:text-[16px] hover:text-blue-200 transition-colors duration-300"
                                        >
                                            info@masjidbaitana.com
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-[16px] font-medium mb-2">Ikuti kami di:</h2>
                                    <div className="flex gap-4">
                                        {socialLinks.map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-blue-200 transition-colors duration-300 flex items-center gap-1"
                                                aria-label={social.label}
                                            >
                                                {social.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="bg-black text-white py-4 text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} <span className="font-semibold">Baitana</span>. All rights reserved.
                </p>
            </footer>
        </>
    );
}
