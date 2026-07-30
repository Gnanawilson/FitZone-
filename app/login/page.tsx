"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, Chrome } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/toast";
import { BrandLogo } from "@/components/ui/brand-logo";

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "alex.morgan@fitpulse.ai",
      password: "password123",
    },
  });

  const onSubmit = async (values: FormValues) => {
    login(values.email, values.name || undefined);
    toast("Welcome back!", `Signed in successfully.`, "success");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#101012] text-white">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo size="lg" href="/" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sign in to your account</h1>
          <p className="text-xs text-[#A0A0AA]">Access your workout routines and athletic performance metrics</p>
        </div>

        <Card className="bg-[#1B1B1F] border-[#32323A] shadow-2xl">
          <CardContent className="pt-6 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Your Name (Optional)"
                placeholder="e.g. Alex Morgan"
                {...register("name")}
                error={errors.name?.message}
              />

              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                error={errors.email?.message}
              />

              <Input
                label="Password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
              />

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-[#A0A0AA] cursor-pointer">
                  <input type="checkbox" className="rounded bg-[#25252C] border-[#3A3A42] text-[#FC4C02]" defaultChecked />
                  Remember me
                </label>
                <Link href="/forgot-password" className="text-[#FC4C02] font-semibold hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" variant="gradient" size="lg" isLoading={isSubmitting} className="w-full gap-2 text-sm font-bold">
                <LogIn className="h-4 w-4" /> Sign In & Update Profile
              </Button>
            </form>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-[#3A3A42] w-full" />
              <span className="bg-[#1B1B1F] px-3 text-[10px] uppercase font-bold text-[#A0A0AA] absolute">Or continue with</span>
            </div>

            <Button
              variant="secondary"
              className="w-full gap-2 bg-[#25252C] hover:bg-[#2F2F38] text-white border-[#3A3A42]"
              onClick={() => {
                login("alex.morgan@fitpulse.ai", "Alex Morgan");
                toast("Google Sign-In Success!", "Authenticated via Google OAuth.", "success");
                router.push("/dashboard");
              }}
            >
              <Chrome className="h-4 w-4 text-rose-500" /> Sign in with Google
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-[#A0A0AA]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#FC4C02] font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
