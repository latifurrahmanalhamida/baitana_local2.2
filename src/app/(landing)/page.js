"use client"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"

import HeroSection from "@/components/landing/HeroSection";
import FacilitySection from "@/components/landing/FacilitySection";
import EventSection from "@/components/landing/EventSection";
import DonationSection from "@/components/landing/DonationSection";
import NewsSection from "@/components/landing/NewsSection";
import Navbar from "@/components/landing/Navbar";

export default function Home() {

    return (
        <>
            <Navbar />
            <HeroSection />
            <FacilitySection />
            <EventSection />
            <DonationSection />
            <NewsSection />
            <Footer />
        </>
    );
}
