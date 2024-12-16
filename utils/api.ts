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

  if (rest.ok) {
    const data = await rest.json()
    return data
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
