import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { AgentView } from '@/modules/agents/ui/view/agent-view'
import { getQueryClient, trpc } from '@/trpc/server'

interface AgentPageProps {
  params: Promise<{
    agentId: string
  }>
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { agentId } = await params

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading agent"
            description="This may take a few seconds"
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Failed to load agent"
              description="Something went wrong, please try again later"
            />
          }
        >
          <AgentView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}
