import FeatureItem from "./FeatureItem";

export default function Feature() {
  const features = [
    {
      src: "/images/features/imam.png",
      alt: "Imam Hafidz Qur'an",
      title: "Imam Hafidz Qur'an dan Menguasai Berbagai Mazhab",
    },
    {
      src: "/images/features/ac.png",
      alt: "Masjid Dilengkapi AC",
      title: "Masjid Dilengkapi AC, Memastikan Ruangan Sejuk",
    },
    {
      src: "/images/features/masjid.png",
      alt: "Masjid Terbuka 24 Jam",
      title: "Masjid Terbuka 24 Jam Dengan Jaminan Keamanan",
    },
    {
      src: "/images/features/karpet.png",
      alt: "Karpet Lembut",
      title: "Menggunakan Karpet Terbaik yang Lembut Dipakai Sujud",
    },
  ];

  return (
    <section id="features" className="py-40 bg-gray-50 px-[100px] lg:px-[180px]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-md text-[#165648] font-semibold uppercase mb-2">
            FITUR
          </p>
          <h2 className="text-3xl md:text-4xl font-bold my-4">
            Semua Kenyamanan
            <br />
            dalam Satu Masjid
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              imageSrc={feature.src}
              imageAlt={feature.alt}
              title={feature.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
