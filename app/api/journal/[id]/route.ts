import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

// Patch(update) is update som props in DB, and PUT(replace) override the whole item in db
export const PATCH = async (request, { params }) => {
  const { content } = await request.json()
  const user = await getUserByClerkID()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id, // params.id coz .id coz the name of folder api/journal/[id]
      },
    },
    data: {
      //data what you want to update
      content,
    },
  })

  return NextResponse.json({ data: updatedEntry })
}
