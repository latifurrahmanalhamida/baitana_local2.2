import Image from "next/image";

export default function Photo() {
  return (
    <section id="gallery" className="pt-16 px-[100px] lg:px-[180px]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-md text-[#165648] font-semibold uppercase mb-2">
            FOTO
          </p>
          <h2 className="text-3xl md:text-4xl font-bold my-4">
            Menjelajahi Keindahan
            <br />
            Masjid Dari Berbagai Sisi
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div
              key={item}
              className={`rounded-lg overflow-hidden ${
                item === 1 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={`/images/photos/photo${item}.png`}
                alt={`Gallery Photo ${item}`}
                width={180}
                height={150}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
