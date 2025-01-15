import Editor from '@/components/Editor'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id) => {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      //query on the compound index, the combination of those two values, underscore is replacing here comma in array
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      // it is like JOIN table in SQL
      analysis: true,
    },
  })

  return entry
}

// you can pass props to client components from a server component, it just has to be serializable(if it is save in db it is 100%)
const EntryPage = async ({ params }) => {
  // .id because of the name of the folder [id]
  const { id } = await params
  const entry = await getEntry(id)

  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage
