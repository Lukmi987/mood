import { auth } from '@clerk/nextjs/server'
import { prisma } from './db'

//This file works only on server

export const getUserByClerkID = async () => {
  const { userId } = await auth()

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  })

  return user
}
