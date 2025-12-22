'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Video } from 'lucide-react'
import { GeneratedAvatar } from '@/components/generated-avatar'
import { Badge } from '@/components/ui/badge'
import { useTRPC } from '@/trpc/client'
import { AgentHeader } from '../components/agent-header'

interface AgentViewProps {
  agentId: string
}

export function AgentView({ agentId }: AgentViewProps) {
  const trpc = useTRPC()

  const { data: agent } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  )

  return (
    <div className="px-4 py-4 flex-1 flex flex-col gap-4 md:px-8">
      <AgentHeader
        agentId={agent.id}
        agentName={agent.name}
        onEdit={() => {}}
        onDelete={() => {}}
      />
      <div className="border rounded-lg">
        <div className="px-4 py-5 flex flex-col gap-5 col-span-5">
          <div className="flex items-center gap-3">
            <GeneratedAvatar
              seed={agent.name}
              variant="botttsNeutral"
              className="size-10"
            />
            <h2 className="text-2xl font-medium">{agent.name}</h2>
          </div>
          <Badge variant="outline" className="flex items-center gap-2">
            <Video className="size-4 text-sky-800" />0 meeting(s)
          </Badge>
          <div className="flex flex-col gap-4">
            <p className="text-lg font-medium">Intructions</p>
            <p className="text-foreground/80">{agent.intructions}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
