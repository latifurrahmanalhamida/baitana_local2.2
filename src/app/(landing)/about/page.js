import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (
        <>
            <div className="relative h-[360px] lg:h-[575px] w-full px-6 py-8 lg:px-[86px] lg:py-[64px]">
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
                <div className="relative z-10 flex justify-center text-white h-full">
                    <div className="flex items-center md:justify-center w-full">
                        <div className="hidden md:block md:w-1/3">
                            <div>
                                <Link href="/" className="inline-block bg-transparent text-[16px] text-white border py-2 px-6 rounded-full">
                                    Kembali
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <h1 className="text-lg md:text-3xl py-1">Sejarah Masjid Baitana</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-6 py-8 lg:px-[86px] lg:py-[64px] text-justify">
                <div className="flex flex-col gap-6">
                    <p className="text-sm md:text-lg">
                        Masjid Baitana berdiri atas dasar kebutuhan spiritual dan sosial masyarakat sekitar yang mendambakan kehadiran sebuah masjid yang tidak hanya menjadi tempat ibadah, tetapi juga pusat pembinaan dan kegiatan kemasyarakatan. Pendirian masjid ini dimulai dari musyawarah dan inisiatif para tokoh masyarakat, pemuda, dan warga lingkungan sekitar yang memiliki visi bersama untuk membangun sebuah masjid yang representatif, terbuka, dan bermanfaat bagi umat.
                    </p>
                    <p className="text-sm md:text-lg">
                        Pembangunan Masjid Baitana dimulai pada tahun [tahun berdiri] secara bertahap, dengan dana swadaya masyarakat, sumbangan donatur, dan dukungan berbagai pihak yang memiliki kepedulian tinggi terhadap perkembangan dakwah Islam. Semangat gotong royong menjadi pondasi kuat dalam pembangunan fisik maupun pengembangan kegiatan keislaman di masjid ini.
                    </p>
                    <p className="text-sm md:text-lg">
                        Sejak diresmikan, Baitana aktif menyelenggarakan beragam program keagamaan seperti shalat berjamaah, pengajian rutin, majelis taklim, kegiatan belajar mengaji untuk anak-anak, dan ceramah keislaman pada momen-momen penting seperti Ramadhan dan Maulid Nabi. Selain itu, Baitana juga turut andil dalam kegiatan sosial masyarakat seperti pembagian sembako, santunan anak yatim, penggalangan dana kemanusiaan, dan program infaq dan sedekah.
                    </p>
                    <p className="text-sm md:text-lg">
                        Dalam perjalanannya, Baitana terus beradaptasi dengan perkembangan teknologi informasi guna meningkatkan efektivitas pelayanan terhadap jamaah. Salah satu bentuk inovasinya adalah pengembangan Sistem Informasi Masjid Baitana berbasis web. Sistem ini dibuat untuk mendukung transparansi pengelolaan dana, administrasi kegiatan, pelaporan donasi, pengelolaan inventaris barang wakaf, serta mempermudah komunikasi antara pengurus dan jamaah.
                    </p>
                    <p className="text-sm md:text-lg">
                        Dengan sistem ini, jamaah maupun donatur dapat lebih mudah mengakses informasi terkait kegiatan masjid, riwayat donasi, laporan keuangan, dan program-program penggalangan dana yang sedang berjalan. Hal ini sekaligus menjadi bentuk tanggung jawab dan keterbukaan pengurus masjid dalam mengelola amanah umat.
                    </p>
                    <p className="text-sm md:text-lg">
                        Kini, Masjid Baitana tidak hanya dikenal sebagai tempat ibadah, tetapi juga sebagai pusat pengembangan umat yang memadukan nilai-nilai spiritual, edukatif, dan sosial dalam satu kesatuan. Dengan semangat kebersamaan dan keikhlasan, Masjid Baitana akan terus berkembang menjadi masjid yang modern, terbuka, dan memberi manfaat luas bagi umat serta lingkungan sekitarnya.
                    </p>
                </div>
            </div>
        </>
    );
}