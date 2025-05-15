import Image from "next/image";
import Link from "next/link";

export default function FooterLogo() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/" className="mb-4">
        <div className="w-full">
          <Image
            src="/images/logo.png"
            alt="Logo Masjid Al Khandari"
            width="200"
            height="40"
          />
        </div>
      </Link>
      <p className="text-sm text-justify mb-4">
        Masjid ini memiliki desain arsitektur indah dan fasilitas lengkap,
        menyediakan lingkungan yang nyaman untuk ibadah dan kegiatan komunitas.
      </p>
      <div className="flex space-x-3">
        <Link href="#" className="text-center">
          <div className="w-8 h-8 bg-white shadow-md rounded-full">
            <Image
              src="/icons/facebook.png"
              alt="Facebook"
              width="32"
              height="32"
            />
          </div>
        </Link>
        <Link href="#" className="text-center">
          <div className="w-8 h-8 bg-white shadow-md rounded-full">
            <Image
              src="/icons/instagram.png"
              alt="Instagram"
              width="32"
              height="32"
            />
          </div>
        </Link>
        <Link href="#" className="text-center">
          <div className="w-8 h-8 bg-white shadow-md rounded-full">
            <Image
              src="/icons/tiktok.png"
              alt="TikTok"
              width="32"
              height="32"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
