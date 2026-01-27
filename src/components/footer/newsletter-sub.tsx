"use client";

import { CheckCircle2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { api } from "@/src/server/react";

export function NewsletterSub() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const routeParams = useParams<{ slug: string | undefined }>();
  const { data: countryName } = api.country.getCountryNameBySlug.useQuery(
    routeParams.slug!,
    {
      enabled: !!routeParams.slug,
    },
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!countryName) return null;

  return (
    <section className="flex flex-col gap-2 max-w-md w-full justify-self-center items-center">
      {isSubmitted ? (
        <p className="flex items-center gap-2 text-primary">
          <CheckCircle2Icon className="size-5" />
          <span className="text-lg font-medium">
            You will now receive updates for {countryName}!
          </span>
        </p>
      ) : (
        <>
          <h3 className="text-lg font-medium text-muted-foreground text-center">
            Subscribe to updates about {countryName}
          </h3>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full h-11"
              required
            />
            <Button type="submit" size="lg" className="shadow-md">
              Subscribe
            </Button>
          </form>
        </>
      )}
    </section>
  );
}
