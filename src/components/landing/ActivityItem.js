import Image from "next/image";

export default function ActivityItem({
  title,
  description,
  imageSrc,
  imageAlt,
}) {
  return (
    <div className="bg-white text-black rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="font-bold text-xl text-justify mb-2">{title}</h3>
        <p className="text-sm text-justify text-black mb-4">{description}</p>
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={384}
            height={192}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
