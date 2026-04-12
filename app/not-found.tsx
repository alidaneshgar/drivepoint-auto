import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-[calc(2.25rem+73px)] text-center">
      <h1 className="mb-4 text-5xl font-bold text-muted-foreground sm:text-6xl">404</h1>
      <h2 className="mb-2 text-xl font-semibold sm:text-2xl">Page Not Found</h2>
      <p className="mb-6 max-w-md text-sm text-muted-foreground sm:mb-8 sm:text-base">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Button asChild className="rounded-xl">
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/inventory">Browse Inventory</Link>
        </Button>
      </div>
    </div>
  );
}
