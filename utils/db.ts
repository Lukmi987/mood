import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Creatin a new connetction do the db, we want to limit those connection strings as much as possible,
// if we have already instantiate prisma by checking globalThis.prisma, all that done in dev mode coz
// nextJs hotReload
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
