'use client'

import { CirclePlus, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DEFAULT_PAGE } from '@/utils/contants'
import { useAgentsFilters } from '../../hooks/use-agents-filters'
import { AgentsSearchFilter } from './agents-search-filter'
import { NewAgentDialog } from './new-agent-dialog'

export function AgentsListHeader() {
  const [filters, setFilters] = useAgentsFilters()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const isAnyFilterModified = !!filters.search

  function onClearFilters() {
    setFilters({ search: '', page: DEFAULT_PAGE })
  }

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

        <div className="py-1 flex items-center gap-2">
          <AgentsSearchFilter />
          {isAnyFilterModified && (
            <Button variant="outline" onClick={onClearFilters}>
              <X className="size-4" />
              Clear
            </Button>
          )}
        </div>
      </div>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}
