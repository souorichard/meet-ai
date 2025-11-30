import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
  title: string
  description: string
}

export function LoadingState({ title, description }: LoadingStateProps) {
  return (
    <div className="px-8 py-4 flex flex-1 items-center justify-center">
      <div className="p-10 flex flex-col items-center justify-center gap-6 rounded-lg">
        <Loader2 className="size-6 animate-spin text-primary" />
        <div className="space-y-2 text-center">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}
