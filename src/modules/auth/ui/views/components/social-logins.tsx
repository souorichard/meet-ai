import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

interface SocialLoginsProps {
  isPending: boolean
  onSocial: (provider: 'github' | 'google') => void
}

export function SocialLogins({ isPending, onSocial }: SocialLoginsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        onClick={() => onSocial('github')}
        disabled={isPending}
      >
        <FaGithub className="size-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => onSocial('google')}
        disabled={isPending}
      >
        <FaGoogle className="size-4" />
      </Button>
    </div>
  )
}
