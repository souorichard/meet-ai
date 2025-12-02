import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { SearchParams } from 'nuqs'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { loadSearchParams } from '@/modules/agents/params'
import { AgentsListHeader } from '@/modules/agents/ui/components/agents-list-header'
import { AgentsView } from '@/modules/agents/ui/view/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'

interface AgentsPageProps {
  searchParams: Promise<SearchParams>
}

export default async function AgentsPage({ searchParams }: AgentsPageProps) {
  const filters = await loadSearchParams(searchParams)

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    }),
  )

  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading agents"
              description="This may take a few seconds"
            />
          }
        >
          <ErrorBoundary
            fallback={
              <ErrorState
                title="Failed to load agents"
                description="Something went wrong, please try again later"
              />
            }
          >
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}
