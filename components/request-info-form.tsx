"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dms.sysandgo.com/api";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email("Valid email is required"),
});

type FormData = z.infer<typeof schema>;

export function RequestInfoForm({
  vehicleId,
  onSuccess,
}: {
  vehicleId: number;
  onSuccess?: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`${API_URL}/websiteMessages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, vehicleId }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      toast.success("Request sent! We'll get back to you soon.");
      onSuccess?.();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle className="h-10 w-10 text-green-500" />
        <p className="font-semibold">Request Sent!</p>
        <p className="text-sm text-muted-foreground">We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="firstName">First Name *</Label>
        <Input id="firstName" placeholder="John" {...register("firstName")} />
        {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" placeholder="Doe" {...register("lastName")} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input id="phoneNumber" type="tel" placeholder="(604) 555-1234" {...register("phoneNumber")} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90">
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isSubmitting ? "Sending..." : "Send Request"}
      </Button>
    </form>
  );
}
