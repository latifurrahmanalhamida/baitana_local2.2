import Link from "next/link";

export default function FooterContact() {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Kontak</h3>
      <ul className="space-y-2">
        <li>
          <Link href="#" className="hover:text-green-200">
            081234567890 <strong>(WA)</strong>
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-green-200">
            987F1D6L <strong>(PIN BBM)</strong>
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-green-200">
            087634561234 <strong>(Telegram)</strong>
          </Link>
        </li>
      </ul>
    </div>
  );
}
