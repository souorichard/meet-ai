import { botttsNeutral, initials } from '@dicebear/collection'
import { createAvatar, type Result } from '@dicebear/core'
import { cn } from '@/lib/utils'
import { getInitials } from '@/utils/get-initials'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface GeneratedAvatarProps {
  seed: string
  variant: 'initials' | 'botttsNeutral'
  className?: string
}

export function GeneratedAvatar({
  seed,
  variant,
  className,
}: GeneratedAvatarProps) {
  let avatar: Result

  if (variant === 'botttsNeutral') {
    avatar = createAvatar(botttsNeutral, {
      seed,
    })
  } else {
    avatar = createAvatar(initials, {
      seed,
    })
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="Agent avatar" />
      <AvatarFallback>{getInitials(seed.toUpperCase())}</AvatarFallback>
    </Avatar>
  )
}
