import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">
        This page is not on the syllabus
      </h1>
      <p className="mt-3 text-sm text-muted">
        The lesson or track you asked for is not in the catalogue.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Back to the desk</Link>
      </Button>
    </div>
  );
}
