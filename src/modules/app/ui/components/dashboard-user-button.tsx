'use client'

import { ChevronDown, CreditCard, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useIsMobile } from '@/hooks/use-mobile'
import { authClient } from '@/lib/auth-client'
import { getInitials } from '@/utils/get-initials'

export function DashboardUserButton() {
  const router = useRouter()
  const isMobile = useIsMobile()

  const { data, isPending } = authClient.useSession()

  if (isPending || !data?.user) {
    return null
  }

  function onSignOut() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in')
        },
      },
    })
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="w-full p-3 flex items-center justify-between gap-3 bg-white/5 border border-border/10 rounded-lg overflow-hidden hover:bg-white/10">
          {data.user.image && (
            <Avatar className="size-9">
              <AvatarImage src={data.user.image} />
              <AvatarFallback>{getInitials(data.user.name)}</AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1 space-y-0.5 text-left overflow-hidden">
            <p className="w-full text-sm truncate">{data.user.name}</p>
            <p className="w-full text-xs text-white/50 truncate">
              {data.user.email}
            </p>
          </div>
          <ChevronDown className="size-4" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Account</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="outline"
              className="flex items-center justify-between gap-3 cursor-pointer"
            >
              Billing
              <CreditCard className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-between gap-3 cursor-pointer"
            >
              Log out
              <LogOut className="size-4" />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full p-3 flex items-center justify-between gap-3 bg-white/5 border border-border/10 rounded-lg overflow-hidden hover:bg-white/10">
        {data.user.image && (
          <Avatar className="size-9">
            <AvatarImage src={data.user.image} />
            <AvatarFallback>{getInitials(data.user.name)}</AvatarFallback>
          </Avatar>
        )}
        <div className="flex-1 space-y-0.5 text-left overflow-hidden">
          <p className="w-full text-sm truncate">{data.user.name}</p>
          <p className="w-full text-xs text-white/50 truncate">
            {data.user.email}
          </p>
        </div>
        <ChevronDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="end" className="w-72">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem className="flex items-center justify-between gap-3 cursor-pointer">
          Billing
          <CreditCard className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center justify-between gap-3 cursor-pointer"
          onClick={onSignOut}
        >
          Log out
          <LogOut className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
