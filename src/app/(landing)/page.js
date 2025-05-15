import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Feature from "@/components/landing/Feature";
import Activity from "@/components/landing/Activity";
import Photo from "@/components/landing/Photo";
import Location from "@/components/landing/Location";
import Footer from "@/components/landing/Footer";

export default function Home() {
    return (
        <>
            <div className="relative">
                <Navbar className="absolute top-0 left-0 right-0 z-10" />
                <Hero className="pt-20 md:pt-20 lg:pt-24" />
            </div>
            <main>
                <Feature />
                <Activity />
                <Photo />
                <Location />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
