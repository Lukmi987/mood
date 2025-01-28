import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { qa } from '@/utils/ai'
import { NextResponse } from 'next/server'

//request is the question that the user asked
export const POST = async (request) => {
  console.log('questioin api !!!!!!!!!!1', request)
  const { question } = await request.json()
  const user = await getUserByClerkID()

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries)

  return NextResponse.json({ data: answer })
}
