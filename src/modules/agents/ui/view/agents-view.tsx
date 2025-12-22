'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { EmptyState } from '@/components/empty-state'
import { Pagination } from '@/components/pagination'
import { useTRPC } from '@/trpc/client'
import { useAgentsFilters } from '../../hooks/use-agents-filters'
import { AgentsTable } from '../components/agents-table'
import { columns } from '../components/agents-table/columns'

export function AgentsView() {
  const trpc = useTRPC()
  const router = useRouter()
  const [filters, setFilters] = useAgentsFilters()

  const { data: agents } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    }),
  )

  return (
    <div className="px-4 pb-4 space-y-4 flex-1 md:px-8">
      <AgentsTable
        columns={columns}
        data={agents.items}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <Pagination
        page={filters.page}
        totalPages={agents.totalPages}
        onChangePage={(page) => setFilters({ page })}
      />
      {agents.items.length === 0 && (
        <EmptyState
          title="Create your firts agent"
          description="Add an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call"
        />
      )}
    </div>
  )
}
