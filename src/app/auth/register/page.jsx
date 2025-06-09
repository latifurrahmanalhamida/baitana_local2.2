import { GalleryVerticalEnd } from "lucide-react"

import { RegisterForm } from "@/components/register/register-form"
import {LoginForm} from "@/components/login/login-form";

export default function LoginPage() {
  return (
    <div
      className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm md:max-w-5xl justify-center">
          <RegisterForm title={"Selamat Datang!"} description={"Lengkapi form ini untuk membuat akun baru."} />
      </div>
    </div>
  );
}
