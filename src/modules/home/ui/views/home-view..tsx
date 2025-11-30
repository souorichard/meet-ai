'use client'

import { useQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'

export function HomeView() {
  const trpc = useTRPC()

  const { data } = useQuery(trpc.hello.queryOptions({ text: 'Richard' }))

  return <div className="p-4 space-y-4">{data?.greeting}</div>
}
