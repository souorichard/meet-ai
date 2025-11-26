'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

export function HomeView() {
  const router = useRouter()

  const { data: session } = authClient.useSession()

  return (
    <div className="p-4 space-y-4">
      <p>Logged is a {session?.user?.name}</p>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push('/sign-in')
              },
            },
          })
        }
      >
        Sign out
      </Button>
    </div>
  )
}
