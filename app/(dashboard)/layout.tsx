// It stays static, does not rerender when our route changes

import { UserButton } from '@clerk/nextjs'

//layout.tsx: This file acts as a wrapper for all pages contained within the (dashboard) directory. It can include shared components such as headers, footers, or sidebars,
//and it uses the children prop to render the content of any nested pages.
//
const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
        Mood
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
