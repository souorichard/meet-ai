import Image from 'next/image'

interface EmptyStateProps {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/empty.svg"
        width={240}
        height={240}
        className="size-60"
        alt="Logo"
      />
      <div className="max-w-md mx-auto space-y-6 text-center">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
