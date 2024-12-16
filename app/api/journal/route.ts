import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

//This function is part of a Next.js API route designed to handle POST requests to the /api/journal endpoint.
export const POST = async () => {
  const user = await getUserByClerkID()

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!',
    },
  })

  revalidatePath('/journal')
  //NextResponse: A helper from Next.js for constructing responses in serverless functions or API routes.
  return NextResponse.json({ data: entry })
}
