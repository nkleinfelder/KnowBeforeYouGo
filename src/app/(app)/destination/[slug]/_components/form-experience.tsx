"use client";

import { Card } from "@/src/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/src/components/ui/field";
import { CheckIcon, Loader2Icon, SendIcon, SquarePenIcon } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";

type Inputs = {
  name: string;
  email: string;
  category: string;
  message: string;
};

export function ShareExperience({
  countryId,
  countryName,
}: {
  countryId: string;
  countryName: string;
}) {
  const { register, handleSubmit } = useForm<Inputs>();
  const [state, setState] = useState<"initial" | "submitting" | "success">(
    "initial",
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setState("submitting");

    setTimeout(() => {
      console.log(data);
      setState("success");
    }, 2000);
  };

  return (
    <section className="w-2xl max-w-full">
      <Card size="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldLegend>
              <SquarePenIcon className="size-6 text-primary" />
              Share you Experience
            </FieldLegend>
            <FieldDescription>
              You have valuable information about {countryName}? Help fellow
              students by sharing your insights!
            </FieldDescription>
            <FieldGroup className="grid md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...register("name")}
                  id="name"
                  placeholder="Your name"
                  className="w-full"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email")}
                  id="email"
                  placeholder="Your email"
                  className="w-full"
                />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select defaultValue="">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add-data">Add Data</SelectItem>
                    <SelectItem value="improve-data">Improve Data</SelectItem>
                    <SelectItem value="misleading-info">
                      Misleading Info
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <Textarea
                  {...register("message")}
                  id="message"
                  placeholder="Your message"
                  className="min-h-24 w-full"
                />
              </Field>
            </FieldGroup>
            <Field>
              <Button
                size="lg"
                type="submit"
                data-state={state}
                disabled={state !== "initial"}
                className="w-full gap-2 transition-all duration-200 ease-out data-[state=success]:bg-green-700 data-[state=success]:text-green-50"
              >
                {state === "initial" && (
                  <>
                    <SendIcon className="size-4" />
                    Submit Information
                  </>
                )}
                {state === "submitting" && (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    Submitting...
                  </>
                )}
                {state === "success" && (
                  <>
                    <CheckIcon className="size-4" />
                    Thanks for sharing!
                  </>
                )}
              </Button>
            </Field>
          </FieldSet>
        </form>
      </Card>
    </section>
  );
}
