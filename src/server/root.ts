import { countryRouter } from "./routers/country";
import { createCallerFactory, createTRPCRouter } from "./trpc";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const appRouter = createTRPCRouter({
  country: countryRouter,
});

export type AppRouter = typeof appRouter;
export type AppRouterInput = inferRouterInputs<AppRouter>;
export type AppRouterOutput = inferRouterOutputs<AppRouter>;
export const createCaller = createCallerFactory(appRouter);
