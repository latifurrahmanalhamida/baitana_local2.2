import Image from "next/image";

export default function FeatureItem({ imageSrc, imageAlt, title }) {
  return (
    <div className="text-center">
      <div className="w-32 h-32 shadow-md rounded-full flex items-center justify-center mx-auto mb-4">
        <Image src={imageSrc} alt={imageAlt} width="180" height="180" />
      </div>
      <h3 className="font-light mb-2">{title}</h3>
    </div>
  );
}
