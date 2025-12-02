import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useAgentsFilters } from '../../hooks/use-agents-filters'

export function AgentsSearchFilter() {
  const [filters, setFilters] = useAgentsFilters()

  return (
    <div className="relative">
      <Search className="size-4 absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Filter by name..."
        className="w-50 h-9 pl-7"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
    </div>
  )
}
