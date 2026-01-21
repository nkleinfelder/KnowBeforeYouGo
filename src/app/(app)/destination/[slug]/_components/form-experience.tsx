"use client";

import { Card } from "@/src/components/ui/card";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/src/components/ui/field";
import {
  CheckIcon,
  Loader2Icon,
  SendIcon,
  SquarePenIcon,
  XIcon,
} from "lucide-react";
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
import { api } from "@/src/server/react";
import { COUNTRY_CATEGORIES } from "@/src/lib/categories";

type Inputs = {
  hasVisited: boolean;
  durationOfStay: number | undefined;
  category: string;
  issueType: string;
  description: string;
};

export function ShareExperience({
  countryName,
}: {
  countryId: string;
  countryName: string;
}) {
  const { register, handleSubmit, control, watch } = useForm<Inputs>({
    defaultValues: {
      hasVisited: true,
      durationOfStay: undefined,
      category: "",
      issueType: "",
      description: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const hasVisited = watch("hasVisited");

  const {
    mutateAsync: submitExperience,
    isPending,
    isError,
    isSuccess,
    error,
  } = api.experience.submitExperience.useMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await submitExperience({
      countryName,
      countryExperience: {
        hasVisited: data.hasVisited,
        durationOfStay: data.durationOfStay,
      },
      category: data.category,
      issue: {
        issueType: data.issueType,
        description: data.description,
      },
    });
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
                <FieldLabel htmlFor="hasVisited">
                  Have you visited {countryName}?
                </FieldLabel>
                <Controller
                  name="hasVisited"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ? "yes" : "no"}
                      onValueChange={(value) => field.onChange(value === "yes")}
                    >
                      <SelectTrigger id="hasVisited">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              {hasVisited && (
                <Field>
                  <FieldLabel htmlFor="durationOfStay">
                    Duration of stay (months)
                  </FieldLabel>
                  <Input
                    {...register("durationOfStay", { valueAsNumber: true })}
                    id="durationOfStay"
                    type="number"
                    min={1}
                    placeholder="e.g. 6"
                    className="w-full"
                  />
                </Field>
              )}
            </FieldGroup>
            <FieldGroup className="grid md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CATEGORIES?.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="issueType">Issue Type</FieldLabel>
                <Controller
                  name="issueType"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="issueType">
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Add Data">Add Data</SelectItem>
                        <SelectItem value="Improve Data">
                          Improve Data
                        </SelectItem>
                        <SelectItem value="Misleading Info">
                          Misleading Info
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  {...register("description")}
                  id="description"
                  placeholder="Describe your experience or the information you want to share..."
                  className="min-h-24 w-full"
                />
              </Field>
            </FieldGroup>
            <Field>
              <Button
                size="lg"
                type="submit"
                disabled={isPending || isSuccess}
                className="w-full gap-2 transition-all duration-200 ease-out data-[state=success]:bg-green-700 data-[state=success]:text-green-50"
              >
                {!isPending && !isSuccess && !isError && (
                  <>
                    <SendIcon className="size-4" />
                    Submit Information
                  </>
                )}
                {isPending && (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    Submitting...
                  </>
                )}
                {isSuccess && (
                  <>
                    <CheckIcon className="size-4" />
                    Thanks for sharing!
                  </>
                )}
                {isError && (
                  <>
                    <XIcon className="size-4 text-destructive" />
                    Something went wrong. {error.message}
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
