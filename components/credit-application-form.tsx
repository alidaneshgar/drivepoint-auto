"use client";

import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dms.sysandgo.com/api";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

export function CreditApplicationForm() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState({
    firstName: "", lastName: "", phoneNumber1: "", email: "",
    sex: "", dateOfBirth: "", address1: "", address2: "",
    province: "", city: "", postalCode: "", dLNo: "",
    dependantsCount: "", sin: "", homeResidenceType: "",
    rentOrMortgageAmount: "", formerAddress: "", formerProvince: "", formerCity: "",
    employerName: "", employerAddress: "", businessPhoneNumber: "",
    businessNature: "", employmentYears: "", employmentMonths: "",
    occupation: "", monthlyIncome: "", formerEmployerName: "",
    coSignerType: "", coSignerFirstName: "", coSignerLastName: "",
    coSignerSin: "", coSignerDateOfBirth: "",
    coSignerEmployerName: "", coSignerEmployerAddress: "",
    coSignerBusinessPhoneNumber: "", coSignerBusinessNature: "",
    coSignerEmploymentYears: "", coSignerEmploymentMonths: "",
    coSignerOccupation: "", coSignerMonthlyIncome: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/websiteMessages/financeApplication`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          customerType: "individual",
          customerState: "Finance Applicant",
          message: "I have filled the finance application form in your website. Would you please contact me?",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSaved(true);
      toast.success("Application submitted successfully!");
    } catch {
      toast.error("Something went wrong. Please try again or call us.");
    } finally {
      setSaving(false);
    }
  };

  if (saved) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <CheckCircle className="h-14 w-14 text-green-500" />
        <h2 className="text-2xl font-bold">Application Submitted</h2>
        <p className="text-muted-foreground">
          Thank you! We will review your application and get back to you soon.
        </p>
      </div>
    );
  }

  const inputClass = "h-10";
  const selectClass = "h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Applicant Information */}
      <div>
        <h2 className="mb-6 text-xl font-bold border-b border-border pb-3">Applicant Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First Name"><Input className={inputClass} value={data.firstName} onChange={set("firstName")} /></Field>
          <Field label="Last Name"><Input className={inputClass} value={data.lastName} onChange={set("lastName")} /></Field>
          <Field label="Phone Number"><Input className={inputClass} type="tel" value={data.phoneNumber1} onChange={set("phoneNumber1")} /></Field>
          <Field label="Email"><Input className={inputClass} type="email" value={data.email} onChange={set("email")} /></Field>
          <Field label="Sex">
            <select className={selectClass} value={data.sex} onChange={set("sex")}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="N/A">N/A</option>
            </select>
          </Field>
          <Field label="Date of Birth"><Input className={inputClass} type="date" value={data.dateOfBirth} onChange={set("dateOfBirth")} /></Field>
          <Field label="Address 1"><Input className={inputClass} value={data.address1} onChange={set("address1")} /></Field>
          <Field label="Address 2"><Input className={inputClass} value={data.address2} onChange={set("address2")} /></Field>
          <Field label="Province"><Input className={inputClass} value={data.province} onChange={set("province")} /></Field>
          <Field label="City"><Input className={inputClass} value={data.city} onChange={set("city")} /></Field>
          <Field label="Postal Code"><Input className={inputClass} value={data.postalCode} onChange={set("postalCode")} /></Field>
          <Field label="Driver's Licence Number"><Input className={inputClass} value={data.dLNo} onChange={set("dLNo")} /></Field>
          <Field label="Number of Dependants"><Input className={inputClass} type="number" value={data.dependantsCount} onChange={set("dependantsCount")} /></Field>
          <Field label="Social Insurance Number"><Input className={inputClass} value={data.sin} onChange={set("sin")} /></Field>
          <Field label="Home Residence Type">
            <select className={selectClass} value={data.homeResidenceType} onChange={set("homeResidenceType")}>
              <option value="">Select</option>
              <option value="Rent">Rent</option>
              <option value="Own">Own</option>
              <option value="Room & Board">Room & Board</option>
            </select>
          </Field>
          <Field label="Rent/Mortgage Amount ($)"><Input className={inputClass} type="number" value={data.rentOrMortgageAmount} onChange={set("rentOrMortgageAmount")} /></Field>
          <Field label="Former Address (if &lt; 2 yrs at present)"><Input className={inputClass} value={data.formerAddress} onChange={set("formerAddress")} /></Field>
          <Field label="Former Province"><Input className={inputClass} value={data.formerProvince} onChange={set("formerProvince")} /></Field>
          <Field label="Former City"><Input className={inputClass} value={data.formerCity} onChange={set("formerCity")} /></Field>
          <div /> {/* spacer */}
          <Field label="Present Employer Name"><Input className={inputClass} value={data.employerName} onChange={set("employerName")} /></Field>
          <Field label="Employer Address"><Input className={inputClass} value={data.employerAddress} onChange={set("employerAddress")} /></Field>
          <Field label="Business Phone Number"><Input className={inputClass} type="tel" value={data.businessPhoneNumber} onChange={set("businessPhoneNumber")} /></Field>
          <Field label="Nature of Business"><Input className={inputClass} value={data.businessNature} onChange={set("businessNature")} /></Field>
          <Field label="Current Employment Years"><Input className={inputClass} type="number" value={data.employmentYears} onChange={set("employmentYears")} /></Field>
          <Field label="Current Employment Months"><Input className={inputClass} type="number" value={data.employmentMonths} onChange={set("employmentMonths")} /></Field>
          <Field label="Occupation"><Input className={inputClass} value={data.occupation} onChange={set("occupation")} /></Field>
          <Field label="Gross Monthly Income ($)"><Input className={inputClass} type="number" value={data.monthlyIncome} onChange={set("monthlyIncome")} /></Field>
          <Field label="Former Employer (if &lt; 2 yrs)"><Input className={inputClass} value={data.formerEmployerName} onChange={set("formerEmployerName")} /></Field>
        </div>
      </div>

      {/* Co-Applicant Information */}
      <div>
        <h2 className="mb-6 text-xl font-bold border-b border-border pb-3">Co-Applicant Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Co-Applicant Type">
            <select className={selectClass} value={data.coSignerType} onChange={set("coSignerType")}>
              <option value="">Select</option>
              <option value="Spouse">Spouse</option>
              <option value="Other">Other</option>
            </select>
          </Field>
          <div /> {/* spacer */}
          <Field label="First Name"><Input className={inputClass} value={data.coSignerFirstName} onChange={set("coSignerFirstName")} /></Field>
          <Field label="Last Name"><Input className={inputClass} value={data.coSignerLastName} onChange={set("coSignerLastName")} /></Field>
          <Field label="Social Insurance Number"><Input className={inputClass} value={data.coSignerSin} onChange={set("coSignerSin")} /></Field>
          <Field label="Date of Birth"><Input className={inputClass} type="date" value={data.coSignerDateOfBirth} onChange={set("coSignerDateOfBirth")} /></Field>
          <Field label="Employer Name"><Input className={inputClass} value={data.coSignerEmployerName} onChange={set("coSignerEmployerName")} /></Field>
          <Field label="Employer Address"><Input className={inputClass} value={data.coSignerEmployerAddress} onChange={set("coSignerEmployerAddress")} /></Field>
          <Field label="Business Phone Number"><Input className={inputClass} type="tel" value={data.coSignerBusinessPhoneNumber} onChange={set("coSignerBusinessPhoneNumber")} /></Field>
          <Field label="Nature of Business"><Input className={inputClass} value={data.coSignerBusinessNature} onChange={set("coSignerBusinessNature")} /></Field>
          <Field label="Employment Years"><Input className={inputClass} type="number" value={data.coSignerEmploymentYears} onChange={set("coSignerEmploymentYears")} /></Field>
          <Field label="Employment Months"><Input className={inputClass} type="number" value={data.coSignerEmploymentMonths} onChange={set("coSignerEmploymentMonths")} /></Field>
          <Field label="Occupation"><Input className={inputClass} value={data.coSignerOccupation} onChange={set("coSignerOccupation")} /></Field>
          <Field label="Gross Monthly Income ($)"><Input className={inputClass} type="number" value={data.coSignerMonthlyIncome} onChange={set("coSignerMonthlyIncome")} /></Field>
        </div>
      </div>

      <Button type="submit" disabled={saving} size="lg" className="bg-accent hover:bg-accent/90 rounded-xl">
        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {saving ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
