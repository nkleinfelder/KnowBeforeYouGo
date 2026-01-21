import { countryRouter } from "./routers/country";
import { experienceRouter } from "./routers/experience";
import { recommendationRouter } from "./routers/recommendation";
import { createCallerFactory, createTRPCRouter } from "./trpc";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const appRouter = createTRPCRouter({
  country: countryRouter,
  experience: experienceRouter,
  recommendation: recommendationRouter,
});

export type AppRouter = typeof appRouter;
export type AppRouterInput = inferRouterInputs<AppRouter>;
export type AppRouterOutput = inferRouterOutputs<AppRouter>;
export const createCaller = createCallerFactory(appRouter);
