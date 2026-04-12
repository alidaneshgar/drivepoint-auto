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
  name: z.string().min(1, "Your name is required"),
  email: z.string().email("Valid email is required"),
});

type FormData = z.infer<typeof schema>;

export function ShareVehicleForm({
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
      const res = await fetch(`${API_URL}/vehicles/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, vehicleId }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      toast.success("Vehicle shared successfully!");
      onSuccess?.();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle className="h-10 w-10 text-green-500" />
        <p className="font-semibold">Shared!</p>
        <p className="text-sm text-muted-foreground">The vehicle details have been emailed.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="shareName">Your Name *</Label>
        <Input id="shareName" placeholder="Your name" {...register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="shareEmail">Recipient Email *</Label>
        <Input id="shareEmail" type="email" placeholder="friend@example.com" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isSubmitting ? "Sharing..." : "Share Vehicle"}
      </Button>
    </form>
  );
}
