import Image from 'next/image';
import Link from 'next/link';

export default function NewsSection() {
    const newsItems = [
        {
            id: 1,
            title: "Renovasi Kubah Masjid Al-Hidayah Selesai, Kini Tampil Lebih Megah",
            date: "18 Mei 2025",
            author: "Administrator",
            categories: ["Pembangunan", "Keagamaan"],
            content: "Setelah proses renovasi selama enam bulan, kubah utama Masjid Al-Hidayah kini telah selesai diperbaharui. Kubah berwarna biru langit dengan ornamen kaligrafi emas menghiasi bagian atas masjid, memberikan kesan megah dan menenangkan bagi jamaah. Renovasi ini merupakan bagian dari program pemugaran masjid yang didanai oleh sumbangan warga dan bantuan pemerintah daerah. Selain kubah, beberapa fasilitas lain seperti tempat wudhu dan area parkir juga telah ditingkatkan untuk memberikan kenyamanan lebih bagi jamaah yang beribadah.",
            image: "news-temp.png",
        },
        {
            id: 2,
            title: "Program Tahfidz Quran Masjid Nurul Iman Buka Pendaftaran Angkatan Baru",
            date: "15 Mei 2025",
            author: "Administrator",
            categories: ["Pendidikan", "Keagamaan"],
            content: "Masjid Nurul Iman membuka pendaftaran untuk program Tahfidz Quran angkatan baru yang akan dimulai bulan Juni mendatang. Program ini terbuka untuk anak-anak usia 7-15 tahun dan akan dibimbing langsung oleh ustadz dan ustadzah yang telah hafal 30 juz Al-Quran. Metode pembelajaran yang diterapkan menggunakan pendekatan modern dan tradisional untuk memudahkan peserta dalam menghafal. Pendaftaran dapat dilakukan secara online melalui website resmi masjid atau langsung datang ke sekretariat masjid pada jam operasional.",
            image: "news-temp.png",
        },
        {
            id: 3,
            title: "Masjid Ar-Rahman Gelar Buka Puasa Bersama dan Santunan Anak Yatim",
            date: "10 Mei 2025",
            author: "Administrator",
            categories: ["Sosial", "Keagamaan"],
            content: "Dalam rangka menyambut bulan suci Ramadhan, Masjid Ar-Rahman mengadakan acara buka puasa bersama dan santunan untuk 100 anak yatim dari panti asuhan sekitar. Acara yang diselenggarakan pada hari Minggu kemarin ini dihadiri oleh tokoh masyarakat dan pejabat setempat. Selain pemberian santunan berupa uang tunai dan perlengkapan sekolah, anak-anak yatim juga dihibur dengan penampilan qasidah dan ceramah motivasi. Ketua panitia, Bapak Ahmad Fauzi, menyampaikan bahwa kegiatan ini akan rutin diadakan setiap tahun sebagai bentuk kepedulian masjid terhadap anak-anak kurang mampu.",
            image: "news-temp.png",
        },
        {
            id: 4,
            title: "Kajian Fiqih Muamalah Kontemporer Hadir di Masjid Baitul Muttaqin",
            date: "5 Mei 2025",
            author: "Administrator",
            categories: ["Pendidikan", "Keagamaan"],
            content: "Masjid Baitul Muttaqin menghadirkan kajian rutin Fiqih Muamalah Kontemporer yang akan dilaksanakan setiap Kamis malam setelah sholat Isya. Kajian ini akan membahas berbagai persoalan ekonomi syariah modern seperti investasi digital, cryptocurrency, dan fintech dalam perspektif Islam. Ustadz Dr. Hasan Basri, pakar ekonomi syariah lulusan Al-Azhar Mesir, akan menjadi pemateri tetap dalam kajian ini. Masyarakat umum dipersilakan untuk mengikuti kajian tanpa dipungut biaya dan akan mendapatkan sertifikat kehadiran bagi yang mengikuti minimal 80% dari total pertemuan.",
            image: "news-temp.png",
        },
    ];

    return (
        <section className="border border-red-700">
            <div className="px-6 py-12 lg:px-[86px] lg:py-[92px] ">
                <h1 data-aos="fade-right" className="text-[#2C3E9E] text-2xl lg:text-[36px] font-bold">Berita Terkait</h1>
                <h1 data-aos="fade-up" className="text-black text-sm lg:text-2xl text-justify lg:text-left font-extralight mb-6 lg:mb-6">Update Lengkap Tentang Berita Terkait Kegiatan Masjid</h1>

                <div className="space-y-4 md:space-y-8">
                    {newsItems.map((item) => (
                        <NewsCard key={item.id} news={item} />
                    ))}
                </div>

                <div className="flex justify-center mt-8 md:mt-10">
                    <Link href="#" className="bg-[#2C3E9E] text-sm md:text-lg text-white px-10 py-2 rounded-full font-medium hover:bg-[#3f51b5] transition-colors">
                        Lihat berita lainnya
                    </Link>
                </div>
            </div>
        </section>
    )
}

function NewsCard({news}) {
    return (
        <div data-aos="fade-up" className="bg-white rounded-xl shadow-md overflow-hidden p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                    <div className="relative h-[200px] md:h-[270px] rounded-lg overflow-hidden">
                        <Image
                            src={`/images/landing/${news.image}`}
                            alt={news.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                    </div>
                </div>
                <div className="w-full md:w-2/3 space-y-3">
                    <Link href="/" className="group">
                        <h1 className="text-lg md:text-3xl font-medium text-[#2C3E9E] text-justify  group-hover:text-[#4050c0] transition-colors duration-300">
                            {news.title}
                        </h1>
                    </Link>
                    <h6 className="text-sm md:text-[16px] text-[#FFBD8D] mt-1">{news.date}, {news.author}</h6>
                    <div className="flex gap-2">
                        {news.categories.map((category, index) => (
                            <span key={index} className="px-2 md:px-4 py-1 text-xs text-[#2C3E9E] border border-[#2C3E9E] rounded-full hover:bg-[#2C3E9E] hover:text-white transition-colors duration-300 cursor-pointer">
                                {category}
                            </span>
                        ))}
                    </div>
                    <p className="text-sm md:text-lg text-black text-justify line-clamp-3 overflow-hidden text-ellipsis">
                        {news.content}
                    </p>
                    <div className="flex justify-end">
                        <Link href="#" className="group flex items-center text-[#2C3E9E] font-medium">
                            <span className="text-sm md:text-[16px] relative after:absolute after:bottom-0 after:left-0 after:bg-current after:h-0.5 after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
                                Baca Selengkapnya
                                <Image
                                    src="/icons/chevron-up-outline.png"
                                    alt="Chevron Up"
                                    width={30}
                                    height={30}
                                    className="w-4 md:w-5 h-auto inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1"
                                    priority
                                />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}