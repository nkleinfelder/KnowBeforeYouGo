import { getConfiguredPayload } from "@/src/lib/payload";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";

const payload = await getConfiguredPayload();

const experienceInputSchema = z.object({
  countryName: z.string().min(1, "Country name is required"),
  countryExperience: z.object({
    hasVisited: z.boolean(),
    durationOfStay: z.number().int().optional(),
  }),
  category: z.string().min(1, "Category is required"),
  issue: z.object({
    issueType: z.string().min(1, "Issue type is required"),
    description: z.string().min(1, "Description is required"),
  }),
});

export const experienceRouter = createTRPCRouter({
  submitExperience: publicProcedure
    .input(experienceInputSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await payload.create({
          collection: "user-requests",
          data: {
            countryName: input.countryName,
            countryExperience: {
              hasVisited: input.countryExperience.hasVisited ? "yes" : "no",
              durationOfStay:
                input.countryExperience.durationOfStay?.toString(),
            },
            Category: input.category,
            issue: {
              issueType: input.issue.issueType,
              description: input.issue.description,
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        });

        return {
          success: true,
          id: result.id,
          message: "Your experience has been submitted successfully",
        };
      } catch (error) {
        console.error("Error submitting experience:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to submit your experience. Please try again later.",
        });
      }
    }),
});
