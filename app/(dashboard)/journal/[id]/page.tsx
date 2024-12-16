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
  })

  return entry
}

// you can pass props to client components from a server component, it just has to be serializable(if it is save in db it is 100%)
const EntryPage = async ({ params }) => {
  // .id because of the name of the folder [id]
  const entry = await getEntry(params.id)

  const analysisData = [
    { name: 'Summary', value: '' },
    { name: 'Subject', value: '' },
    { name: 'Mood', value: '' },
    { name: 'Negative', value: '' },
  ]

  return (
    <div className="h-full w-full grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className=" px-2 py-4  border-t border-black/10 flex items-center justify-between"
              >
                <span className="text-lg font-semibold ">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EntryPage
