import { getConfiguredPayload } from "@/src/lib/payload";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";

const payload = await getConfiguredPayload();

export const countryRouter = createTRPCRouter({
  getCountrySlugs: publicProcedure.query(async () => {
    const countries = await payload.find({
      collection: "countries",
      select: {
        name: true,
        slug: true,
      },
      limit: 1000,
    });

    return countries.docs
      .filter((country) => !!country.slug)
      .map((country) => ({
        name: country.name,
        slug: country.slug as string,
      }));
  }),
  getCompareInfo: publicProcedure
    .input(
      z.object({
        originCountrySlug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const originCountry = await payload.find({
        collection: "countries",
        where: {
          slug: {
            equals: input.originCountrySlug,
          },
        },
        select: {
          languageAndCommunication: {
            englishLevelScore: true,
            englishLevels: true,
          },
          culturalAndSocialNorms: {
            lgbtqFriendliness: true,
            lgbtqFriendlinessScore: true,
            veganPopulationShare: true,
            vegetarianPopulationShare: true,
            avgCostOfLiving: true,
          },
          moneyAndPayments: {
            paymentMethods: true,
          },
          navTransport: {
            driverPermitType: true,
          },
          safetyAndLegal: {
            naturalHazardsIndexValue: true,
          },
        },
      });

      if (originCountry.docs.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Origin country not found",
        });
      }

      const data = originCountry.docs[0];

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Origin country not found",
        });
      }

      const englishLevelCategory =
        typeof data.languageAndCommunication?.englishLevels === "object"
          ? data.languageAndCommunication.englishLevels
          : undefined;

      const lgbtqFriendlinessCategory =
        typeof data.culturalAndSocialNorms?.lgbtqFriendliness === "object"
          ? data.culturalAndSocialNorms.lgbtqFriendliness
          : undefined;

      return {
        englishLevel: {
          score: data.languageAndCommunication?.englishLevelScore ?? undefined,
          name: englishLevelCategory?.name,
          description: englishLevelCategory?.description,
        },
        lgbtqFriendliness: {
          score:
            data.culturalAndSocialNorms?.lgbtqFriendlinessScore ?? undefined,
          name: lgbtqFriendlinessCategory?.name,
          description: lgbtqFriendlinessCategory?.description,
        },
        veganPopulationShare:
          data.culturalAndSocialNorms?.veganPopulationShare ?? undefined,
        vegetarianPopulationShare:
          data.culturalAndSocialNorms?.vegetarianPopulationShare ?? undefined,
        paymentMethods: data.moneyAndPayments?.paymentMethods,
        costOfLiving: data.culturalAndSocialNorms?.avgCostOfLiving ?? undefined,
        driversPermitType: data.navTransport?.driverPermitType ?? undefined,
        naturalHazardsIndexValue:
          data.safetyAndLegal?.naturalHazardsIndexValue ?? undefined,
      };
    }),
  getCountryBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const countries = await payload.find({
        collection: "countries",
        where: {
          slug: {
            equals: input,
          },
        },
      });

      if (!countries.docs[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Country not found",
        });
      }

      return countries.docs[0];
    }),
});
