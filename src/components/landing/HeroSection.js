"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"

export default function HeroSection() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const activities = [
        {
            title: "Al - Qur'an",
            time: "05.00 - 07.00",
        },
        {
            title: "Kajian Fiqih",
            time: "08.00 - 09.30",
        },
        {
            title: "Tahsin",
            time: "16.00 - 17.30",
        },
        {
            title: "Ceramah Umum",
            time: "19.30 - 21.00",
        },
    ]

    return (
        <main className="relative h-[440px] lg:h-[640px] w-full px-6 py-8 lg:px-[86px] lg:py-[64px]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-90"></div>
                <Image
                    src="/images/landing/hero-background.png"
                    alt="Mosque background"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between text-white h-full">
                {/* Today's Activities */}
                <div>
                    <h2 className="text-[18px] lg:text-[24px] font-medium">Kegiatan Hari Ini</h2>
                    <h1 className="mb-3 lg:mb-6 text-[24px] lg:text-4xl font-bold">Minggu, 11 Mei</h1>

                    {/* Swiper Component */}
                    {mounted && (
                        <div data-aos="fade-down" className="bg-[#FFBD8D]/90 h-[100px] lg:h-[150px] w-full lg:max-w-xs rounded-lg overflow-hidden">
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                spaceBetween={0}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                // pagination={{ clickable: true }}
                                className="h-full w-full"
                            >
                                {activities.map((activity, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="flex h-full w-full flex-col justify-center rounded-lg p-2 lg:p-5 text-left text-black text-sm lg:text-[32px]">
                                            <h3 className="text-xl lg:text-2xl font-bold">{activity.title}</h3>
                                            <p className="text-xl lg:text-2xl font-bold">{activity.time}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>

                {/* Next Prayer */}
                <div className="mt-auto">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                        <div data-aos="fade-right">
                            <h2 className="lg:mb-2 text-[16px] lg:text-[24px] font-medium">Jadwal Shalat Selanjutnya</h2>
                            <h1 className="lg:mb-2 text-[18px] lg:text-4xl font-bold">Shalat Dzuhur</h1>
                            <p className="mb-2 lg:mb-4 flex items-center text-[16px] lg:text-[24px]">
                                akan dimulai dalam <span className="mx-2 font-bold">01 jam : 19 menit</span> lagi
                            </p>
                        </div>
                        {/* Prayer Times */}
                        <div data-aos="fade-up" className="rounded-lg bg-[#FFBD8D]/90 p-2 lg:p-5 text-white w-full lg:w-1/2">
                            <div className="grid grid-cols-3 space-x-2 space-y-1 lg:space-x-14 lg:gap-3">
                                <div className="my-auto">
                                    <h3 className="text-sm lg:text-lg font-medium">Shalat Shubuh</h3>
                                    <p className="text-sm lg:text-lg font-normal text-[#2C3E9E]">04.31 WIB</p>
                                </div>
                                <div className="my-auto">
                                    <h3 className="text-sm lg:text-lg font-medium">Shalat Dzuhur</h3>
                                    <p className="text-sm lg:text-lg font-normal text-[#2C3E9E]">11.46 WIB</p>
                                </div>
                                <div className="my-auto">
                                    <h3 className="text-sm lg:text-lg font-medium">Shalat Maghrib</h3>
                                    <p className="text-sm lg:text-lg font-normal text-[#2C3E9E]">17.40 WIB</p>
                                </div>
                                <div className="my-auto">
                                    <h3 className="text-sm lg:text-lg font-medium">Syuruk/Terbit</h3>
                                    <p className="text-sm lg:text-lg font-normal text-[#2C3E9E]">05.51 WIB</p>
                                </div>
                                <div className="my-auto">
                                    <h3 className="text-sm lg:text-lg font-medium">Shalat Ashar</h3>
                                    <p className="text-sm lg:text-lg font-normal text-[#2C3E9E]">15.08 WIB</p>
                                </div>
                                <div className="my-auto">
                                    <h3 className="text-sm lg:text-lg font-medium">Shalat Isya</h3>
                                    <p className="text-sm lg:text-lg font-normal text-[#2C3E9E]">18.53 WIB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
