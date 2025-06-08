import '../globals.css';

import {AuthProvider} from "@/context/AuthContext";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AOSInit from "@/components/AOSInit";

export default function LandingLayout({ children }) {
    return (
        <>
        <AuthProvider>
            <AOSInit />
            <Navbar />
            {children}
            <Footer />
        </AuthProvider>
        </>
    );
}
