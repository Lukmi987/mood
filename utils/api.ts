import { PATCH } from '@/app/api/journal/[id]/route'

const createURL = (path: string) => {
  return window.location.origin + path
}

export const updateEntry = async (id, content) => {
  const rest = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )
  console.log('useAutosave rest 1', rest) // zde vraci undefined
  if (rest.ok) {
    const data = await rest.json()
    return data?.data
  }
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

//FUNCTION which update an entry
