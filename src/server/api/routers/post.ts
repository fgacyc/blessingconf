import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  allCards: publicProcedure.query(({ ctx }) => {
    return ctx.db.card.findMany();
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        contact: z.string(),
        company: z.string(),
        position: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.create({
        data: {
          name: input.name,
          contact: input.contact,
          company: input.company,
          position: input.position,
        },
      });
    }),
});
