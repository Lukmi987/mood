import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

// Patch(update) is update som props in DB, and PUT(replace) override the whole item in db
export const PATCH = async (request, { params }) => {
  const { content } = await request.json()
  console.log('use content 2', content)
  const user = await getUserByClerkID()
  const { id } = await params
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: id, // params.id coz .id coz the name of folder api/journal/[id]
      },
    },
    data: {
      //data what you want to update
      content,
    },
    // include: { Now it would inlcude analysis in response
    //   analysis: true,
    // },
  })

  console.log('use content updated 3', updatedEntry)
  const analysis = await analyze(updatedEntry.content) // spreading the object that is returned

  const updated = await prisma.analysis.upsert({
    // upsert means updated if you find it
    where: {
      entryId: updatedEntry.id,
    }, //data what you want to update
    create: {
      entryId: updatedEntry.id,
      ...analysis,
    },
    update: analysis,
  })

  console.log('use content 4', updated)
  const x = NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
  console.log('use c ontent 5', x)
  return x
}
