// It stays static, does not rerender when our route changes

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'

const links = [
  { href: '/', label: 'Home' },
  { name: 'Journals', href: '/journal' },
  { name: 'History', href: '/history' },
]

//layout.tsx: This file acts as a wrapper for all pages contained within the (dashboard) directory. It can include shared components such as headers, footers, or sidebars,
//and it uses the children prop to render the content of any nested pages.
//
const DashboardLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen relative">
      <aside className="absolute left-0 top-0 h-full w-[200px] border-r border-black/10">
        <div className="px-4 my-4">
          <span className="text-3xl">MOOD</span>
        </div>
        <div>
          <ul className="px-4">
            {links.map((link) => (
              <li key={uuidv4()} className="text-xl my-4">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="ml-[200px] h-full]">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}
export default DashboardLayout
