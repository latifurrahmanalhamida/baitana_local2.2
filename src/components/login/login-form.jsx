"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertDialog, AlertDialogAction,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {useState} from "react";

const loginSchema = z.object({
  email: z.string().trim().min(1, {message: "Email tidak boleh kosong."}).email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
});

export function LoginForm({ className, ...props }) {
  const { login, authLoading, error } = useAuth();
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const submit = async (data) => {

    const success = await login(data);

    if (!success) {
      setErrorDialogOpen(true);
    }

    router.push("/dashboard");
  };

  return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit(submit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">{props.title}</h1>
                  <p className="text-muted-foreground text-balance">
                    {props.description}
                  </p>
                </div>

                {error && (
                    <AlertDialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className={"text-center text-red-500"}>Gagal Login!</AlertDialogTitle>
                          <AlertDialogDescription className={"text-center"}>
                            {error}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction className={"mx-auto "} onClick={() => setErrorDialogOpen(false)}>
                            OK
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                )}

                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" {...register("email")} />
                  {errors.email && (
                      <p className="text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                      Lupa password?
                    </a>
                  </div>
                  <Input id="password" type="password" placeholder={"password"} {...register("password")} />
                  {errors.password && (
                      <p className="text-xs text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={authLoading}>
                  {authLoading ? "Loading..." : "Login"}
                </Button>

                <div className="text-center text-sm">
                  Belum punya akun?{" "}
                  <a href="/auth/register" className="underline underline-offset-4">
                    Daftar
                  </a>
                </div>
              </div>
            </form>

            <div className="bg-muted relative hidden md:block">
              <img
                  src="https://placehold.co/400x400@2x.png"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
  );
}