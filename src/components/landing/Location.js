export default function Location() {
  return (
    <section id="contacts">
      <div className="py-24 px-[100px] lg:px-[180px]">
        <div className="container mx-auto text-center">
          <div className="text-center mb-12">
            <p className="text-md text-[#165648] font-semibold uppercase mb-2">
              LOKASI
            </p>
            <h2 className="text-3xl md:text-4xl font-bold my-4">
              Lokasi Masjid Mudah Diakses
            </h2>
          </div>
          <div className="rounded-md shadow-md overflow-hidden">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.388888888889!2d112.6123456!3d-7.9567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNyDCsDU3JzI0LjQiUyAxMTLCsDM2JzQ0LjIiRQ!5e0!3m2!1sid!2sid!4v16xxxxxxxxxxxxx"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
