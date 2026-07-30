"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/toast";
import { BrandLogo } from "@/components/ui/brand-logo";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    login(values.email, values.name);
    toast("Account Created!", "Welcome to Fit Zone+ Athletic Platform.", "success");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#101012] text-white">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo size="lg" href="/" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create your account</h1>
          <p className="text-xs text-[#A0A0AA]">Join over 100M athletes tracking performance on Fit Zone+</p>
        </div>

        <Card className="bg-[#1B1B1F] border-[#32323A] shadow-2xl">
          <CardContent className="pt-6 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label="Full Name" placeholder="e.g. Alex Morgan" {...register("name")} error={errors.name?.message} />
              <Input label="Email address" type="email" placeholder="you@example.com" {...register("email")} error={errors.email?.message} />
              <Input label="Password" type="password" {...register("password")} error={errors.password?.message} />

              <Button type="submit" variant="gradient" size="lg" isLoading={isSubmitting} className="w-full gap-2 text-sm font-bold">
                <UserPlus className="h-4 w-4" /> Create Account
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-[#A0A0AA]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#FC4C02] font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
