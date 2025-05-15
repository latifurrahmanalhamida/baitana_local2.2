import Image from "next/image";
import Link from "next/link";
import {
  Home,
  BookOpen,
  Clock,
  BookMarked,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export default function Hero({ className }) {
  return (
    <div
      className={`${className} w-full min-h-screen flex items-center justify-center`}
    >
      <div className="container text-center mx-[180px]">
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl font-bold text-white mb-4">
            Temukan kedamaian melalui <br /> dekat dengan Tuhan
          </h1>
          <p className="text-base text-white max-w-3xl mx-auto mb-8">
            Masjid Al-Kandari tempat terbaik bagi jamaah ibadah untuk beribadah,
            belajar ilmu agama, mengikuti berbagai kegiatan, memupuk
            persaudaraan hingga mendapatkan pencerahan, atau sekedar singgah
            yang berkaitan dengan keimanan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#"
              className="bg-transparent border-1 border-white hover:bg-white hover:text-green-900 text-white py-3 px-4 rounded-xl transition duration-300"
            >
              Baca Selengkapnya
            </Link>
            <Link
              href="#"
              className="bg-white text-green-900 hover:bg-green-100 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-300"
            >
              <Image
                src="/icons/whatsapp.png"
                alt="Icon WhatsApp"
                width="18"
                height="18"
              />
              Hubungi Kami
            </Link>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <Image
            src="/images/hero-background.png"
            alt="Background Hero"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
