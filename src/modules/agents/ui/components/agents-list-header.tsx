'use client'

import { CirclePlus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { NewAgentDialog } from './new-agent-dialog'

export function AgentsListHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <div className="px-4 py-4 flex flex-col gap-4 md:px-8">
        <div className="flex items-center justify-between gap-3">
          <h5 className="text-xl font-medium">My agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <CirclePlus className="size-4" />
            New agent
          </Button>
        </div>
      </div>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}
