import Image from "next/image";
import Link from "next/link";
import NewsSection from "@/components/landing/NewsSection";

const newsItems = [
    {
        id: 1,
        slug: "renovasi-kubah-masjid-al-hidayah",
        title: "Renovasi Kubah Masjid Al-Hidayah Selesai, Kini Tampil Lebih Megah",
        date: "18 Mei 2025",
        author: "Administrator",
        categories: ["Pembangunan", "Keagamaan"],
        content: `Renovasi kubah Masjid Al-Hidayah telah rampung setelah proses pengerjaan selama tiga bulan. Kubah yang sebelumnya berwarna hijau tua kini dihias dengan warna emas yang memberikan kesan lebih megah dan menawan.

Pekerjaan ini meliputi perbaikan struktur kubah, pengecatan ulang dengan bahan anti karat, serta pemasangan ornamen baru yang terinspirasi dari kaligrafi Islam klasik.

Selain itu, sistem pencahayaan di sekitar kubah juga diperbarui sehingga kubah akan terlihat indah saat malam hari dan menjadi ikon baru di lingkungan sekitar.

Pengurus masjid mengucapkan terima kasih kepada semua donatur yang telah memberikan kontribusi baik materi maupun doa, sehingga renovasi ini dapat selesai tepat waktu.

Harapannya, renovasi ini dapat meningkatkan kenyamanan jamaah dan memacu semangat ibadah di Masjid Al-Hidayah.`,
        image: "/images/landing/news-temp.png",
    },
    {
        id: 2,
        slug: "program-tahfidz-quran-masjid-nurul-iman",
        title: "Program Tahfidz Quran Masjid Nurul Iman Buka Pendaftaran Angkatan Baru",
        date: "15 Mei 2025",
        author: "Administrator",
        categories: ["Pendidikan", "Keagamaan"],
        content: `Masjid Nurul Iman membuka pendaftaran untuk program Tahfidz Quran angkatan baru yang akan dimulai bulan Juni mendatang.

Program ini bertujuan untuk membina generasi muda agar lebih mahir dalam menghafal Al-Quran dengan metode pembelajaran yang modern dan menyenangkan.

Peserta akan mendapatkan bimbingan dari ustadz dan ustadzah berpengalaman serta berbagai fasilitas pendukung seperti kelas belajar yang nyaman dan materi belajar digital.

Pendaftaran dibuka sampai akhir Mei dan dapat dilakukan langsung di kantor pengurus masjid atau melalui website resmi masjid.

Diharapkan program ini dapat menghasilkan hafizh dan hafizhah yang siap menjadi penerus dakwah di masa depan.`,
        image: "/images/landing/news-temp.png",
    },
    {
        id: 3,
        slug: "buka-puasa-bersama-anak-yatim",
        title: "Masjid Ar-Rahman Gelar Buka Puasa Bersama dan Santunan Anak Yatim",
        date: "10 Mei 2025",
        author: "Administrator",
        categories: ["Sosial", "Keagamaan"],
        content: `Dalam rangka menyambut bulan suci Ramadhan, Masjid Ar-Rahman mengadakan acara buka puasa bersama yang diikuti oleh ratusan jamaah dari berbagai kalangan.

Acara ini juga diisi dengan pembagian santunan kepada 100 anak yatim sebagai bentuk kepedulian dan dukungan kepada mereka.

Kegiatan berlangsung dengan penuh kehangatan dan kekeluargaan, serta diisi dengan tausiyah yang mengingatkan pentingnya berbagi dan meningkatkan keimanan selama Ramadhan.

Panitia berharap acara ini bisa menjadi momentum mempererat silaturahmi antar warga dan menginspirasi kegiatan sosial lainnya di masa depan.

Donatur yang ingin berpartisipasi dalam program santunan masih dapat menyumbang melalui rekening resmi masjid.`,
        image: "/images/landing/news-temp.png",
    },
    {
        id: 4,
        slug: "kajian-fiqih-muamalah-kontemporer",
        title: "Kajian Fiqih Muamalah Kontemporer Hadir di Masjid Baitul Muttaqin",
        date: "5 Mei 2025",
        author: "Administrator",
        categories: ["Pendidikan", "Keagamaan"],
        content: `Masjid Baitul Muttaqin menghadirkan kajian rutin Fiqih Muamalah Kontemporer yang akan dilaksanakan setiap Kamis malam mulai pukul 19.30 WIB.

Kajian ini membahas berbagai isu kontemporer terkait hukum muamalah dalam kehidupan sehari-hari dengan pendekatan ilmiah dan aplikatif.

Pembicara adalah ustadz dan akademisi yang ahli dalam bidang fiqih dan ekonomi Islam, sehingga peserta dapat memahami materi dengan baik dan mendalam.

Kajian ini terbuka untuk umum dan diharapkan dapat meningkatkan pemahaman masyarakat tentang muamalah dalam perspektif Islam modern.

Para peserta dianjurkan membawa Al-Quran dan kitab-kitab pendukung untuk mengikuti diskusi secara interaktif.`,
        image: "/images/landing/news-temp.png",
    },
];



function getNewsBySlug(slug) {
    return newsItems.find((item) => item.slug === slug);
}


export default function NewsDetailPage({ params }) {
    const { slug } = params;
    const post = getNewsBySlug(slug);

    return (
        <>
            <div className="relative h-[360px] lg:h-[575px] w-full px-6 py-8 lg:px-[86px] lg:py-[64px]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-70"></div>
                </div>
                <div className="relative z-10 flex items-center justify-center text-white h-full">
                    <div className="flex items-start md:justify-center w-full">
                        <div className="hidden md:block md:w-1/3">
                            <Link href="/news" className="inline-block bg-transparent text-[16px] text-white border py-2 px-6 rounded-full">
                                Kembali
                            </Link>
                        </div>
                        <div className="md:w-2/3">
                            <h1 className="text-lg md:text-3xl">{post.title}</h1>
                            <p className="text-[16px] mt-8 md:mt-16">{post.date}, {post.author}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-6 py-8 lg:px-[86px] lg:pt-[64px] lg:pb-0 text-justify">
                <div className="flex items-center justify-center mb-8 md:mb-16">
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={200}
                        height={200}
                        className="w-full md:w-[484px] h-auto rounded-3xl"
                        priority
                    />
                </div>
                <div className="flex flex-col gap-2 md:space-y-3 text-sm md:text-lg">
                    {post.content.split("\n").map((paragraph, i) => (
                        <p key={i} className="text-sm md:text-lg">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
            <NewsSection />
        </>
    );
}