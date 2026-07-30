"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyRound, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { BrandLogo } from "@/components/ui/brand-logo";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    toast("Reset Link Sent!", "Check your email for password reset instructions.", "info");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#101012] text-white">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo size="lg" href="/" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Reset your password</h1>
          <p className="text-xs text-[#A0A0AA]">Enter your email address and we will send a password reset link</p>
        </div>

        <Card className="bg-[#1B1B1F] border-[#32323A] shadow-2xl">
          <CardContent className="pt-6 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label="Email address" type="email" placeholder="you@example.com" {...register("email")} error={errors.email?.message} />

              <Button type="submit" variant="gradient" size="lg" isLoading={isSubmitting} className="w-full gap-2 text-sm font-bold">
                <KeyRound className="h-4 w-4" /> Send Reset Link
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-[#A0A0AA]">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-[#FC4C02] font-bold hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
