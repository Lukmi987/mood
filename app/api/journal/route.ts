import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { analyze } from '@/utils/ai'
import { update } from '@/utils/actions'

//This function is part of a Next.js API route designed to handle POST requests to the /api/journal endpoint.
export const POST = async (request: Request) => {
  const data = await request.json()
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.create({
    data: {
      content: data.content,
      userId: user.id,
    },
  })

  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      mood: '',
      negative: false,
      summary: '',
      subject: '',
      color: 'blue',
      sentimentScore: 0,
    },
  })

  update(['/journal'])
  //NextResponse: A helper from Next.js for constructing responses in serverless functions or API routes.
  return NextResponse.json({ data: entry })
}
