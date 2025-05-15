import ActivityItem from "./ActivityItem";

export default function Activity() {
  const activities = [
    {
      title: "Kajian Fiqih, Kajian Ibadah 4 Madzhab dan Belajar Ngaji",
      description:
        "Di setiap harinya, masjid akan menyelenggarakan kajian rutin yang dapat diikuti oleh jamaah dari berbagai kalangan.",
      imageSrc: "/images/activities/kajian-fiqih.png",
      imageAlt: "Kajian Fiqih",
    },
    {
      title: "Sembako Gratis dan Santunan Terhadap Dhuafa",
      description:
        "Tersedia paket sembako gratis dan juga kami menyalurkan santunan terhadap dhuafa yang membutuhkan.",
      imageSrc: "/images/activities/sembako-gratis.png",
      imageAlt: "Sembako Gratis",
    },
    {
      title: "Pendidikan dan Pelatihan Kewirausahaan",
      description:
        "Masjid kami memiliki program di di segala usia untuk belajar kewirausahaan dengan mentor yang tinggi akan ilmu dalam bidang yang digeluti.",
      imageSrc: "/images/activities/pendidikan-dan-pelatihan.png",
      imageAlt: "Pendidikan dan Pelatihan",
    },
  ];
  return (
    <section id="activities" className=" text-white">
      <div className="container bg-[#165648] mx-auto px-4 py-18 rounded-xl">
        <div className="text-center mb-12 px-16">
          <p className="text-md font-semibold uppercase mb-2">KEGIATAN</p>
          <h2 className="text-4xl md:text-4xl font-bold mt-4">
            Berbagai Kegiatan Menarik
            <br />
            Yang Tersedia di Masjid
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-16">
          {activities.map((activity, index) => (
            <ActivityItem
              key={index}
              title={activity.title}
              description={activity.description}
              imageSrc={activity.imageSrc}
              imageAlt={activity.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
