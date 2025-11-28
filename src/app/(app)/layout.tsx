import type { PropsWithChildren } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { DashboardSidebar } from '@/modules/app/ui/components/dashboard-sidebar'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen">{children}</main>
    </SidebarProvider>
  )
}
