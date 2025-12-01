'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { CornerDownRight, Video } from 'lucide-react'
import { GeneratedAvatar } from '@/components/generated-avatar'
import { Badge } from '@/components/ui/badge'
import type { AgentGetOne } from '@/modules/agents/types'

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: 'name',
    header: 'Agent name',
    cell: ({ row }) => (
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <GeneratedAvatar
            seed={row.original.name}
            variant="botttsNeutral"
            className="size-6"
          />
          <span className="font-semibold capitalize">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <CornerDownRight className="size-3 text-muted-foreground" />
          <span className="max-w-50 text-sm text-muted-foreground truncate">
            {row.original.intructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'meetingCount',
    header: 'Meetings',
    cell: () => (
      <Badge variant="outline" className="flex items-center gap-2">
        <Video className="size-4 text-sky-800" />0 meeting(s)
      </Badge>
    ),
  },
]
