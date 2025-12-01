'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { EmptyState } from '@/components/empty-state'
import { useTRPC } from '@/trpc/client'
import { AgentsTable } from '../components/agents-table'
import { columns } from '../components/agents-table/columns'

export function AgentsView() {
  const trpc = useTRPC()

  const { data: agents } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

  return (
    <div className="px-4 pb-4 space-y-4 flex-1 md:px-8">
      <AgentsTable columns={columns} data={agents} />
      {agents.length === 0 && (
        <EmptyState
          title="Create your firts agent"
          description="Add an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call"
        />
      )}
    </div>
  )
}
