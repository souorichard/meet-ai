import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/db'
import { agents } from '@/db/schema'
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from '@/trpc/init'
import { agentsInsertSchema } from '../schemas'

export const agentsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const { auth } = ctx

      const { name, intructions } = input

      const [createdAgent] = await db
        .insert(agents)
        .values({
          name,
          intructions,
          userId: auth.user.id,
        })
        .returning()

      return createdAgent
    }),

  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents)

    return data
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id))

      if (!existingAgent) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Agent not found',
        })
      }

      return existingAgent
    }),
})
