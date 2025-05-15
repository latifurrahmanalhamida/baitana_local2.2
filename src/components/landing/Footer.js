import Image from "next/image";
import Link from "next/link";
import FooterLogo from "./FooterLogo";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterCopyright from "./FooterCopyright";

export default function Footer() {
  return (
    <footer className="bg-[#165648] text-white px-[100px] lg:px-[180px]">
      <div className="container mx-auto py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <FooterLogo />
          <FooterLinks />
          <FooterContact />
        </div>
      </div>
      <FooterCopyright />
    </footer>
  );
}
