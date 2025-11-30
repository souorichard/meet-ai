'use client'

import { PanelLeft, PanelLeftClose, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { DashboardCommand } from './dashboard-command'

export function DashboardNavbar() {
  const [commandOpen, setCommandOpen] = useState(false)
  const { state, isMobile, toggleSidebar } = useSidebar()

  useEffect(() => {
    function down(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)

    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [])

  return (
    <>
      <nav className="px-4 py-3 flex items-center gap-2 border-b">
        <Button size="icon" variant="outline" onClick={toggleSidebar}>
          {state === 'collapsed' || isMobile ? (
            <PanelLeft className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </Button>
        <Button
          variant="outline"
          className="w-60 justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <Search className="size-4" />
          Search
          <kbd className="h-5 px-1.5 ml-auto inline-flex items-center gap-1 bg-muted border rounded select-none pointer-events-none text-[10px] font-medium font-mono text-muted-foreground">
            <span>&#8984;</span>K
          </kbd>
        </Button>
      </nav>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
    </>
  )
}
