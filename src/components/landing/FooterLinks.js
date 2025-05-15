import Link from "next/link";

export default function FooterLinks() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-center gap-18">
        <div>
          <h3 className="font-semibold text-lg mb-4">Halaman</h3>
          <ul className="text-sm text-light space-y-2">
            <li>
              <Link href="#" className="hover:text-green-200">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-green-200">
                Berita
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-green-200">
                Kegiatan
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-green-200">
                Tentang
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-green-200">
                Kontak
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">Kegiatan</h3>
          <ul className="text-sm text-light space-y-2">
            <li>
              <Link href="#" className="hover:text-green-200">
                Kajian Fiqih
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-green-200">
                Kajian Ibadah 4 Madzhab
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-green-200">
                Santunan Dhuafa
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-green-200">
                Pelatihan Kewirausahaan
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-green-200">
                Pelatihan Kewirausahaan
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-green-200">
                Belajar Ngaji
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
