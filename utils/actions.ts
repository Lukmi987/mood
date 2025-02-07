'use server'

import { revalidatePath } from 'next/cache'

export const update = async (paths: string[] = []) => {
  if (!Array.isArray(paths)) return
  for (const p of paths) {
    if (typeof p === 'string') {
      revalidatePath(p)
    }
  }
}
