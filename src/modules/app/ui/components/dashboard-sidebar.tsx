'use client'

import { Bot, Rocket, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { DashboardUserButton } from './dashboard-user-button'

const firstSection = [
  {
    icon: Video,
    name: 'Mettings',
    href: '/meetings',
  },
  {
    icon: Bot,
    name: 'Agents',
    href: '/agents',
  },
]

const secondSection = [
  {
    icon: Rocket,
    name: 'Upgrade',
    href: '/upgrade',
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="px-2 pt-2 flex items-center gap-2">
          <Image
            src="/logo.svg"
            width={36}
            height={36}
            className="size-9"
            alt="Logo"
          />
          <p className="text-2xl font-semibold">Meet.AI</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5d6b68]" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => {
                const isActive = item.href === pathname

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      className={cn(
                        'h-10 border border-transparent hover:bg-linear-to-r/oklch from-sidebar-accent from-5% via-sidebar/50 via-30% to-sidebar/50 hover:border-[#5d6b68]/10',
                        isActive && 'bg-linear-to-r/oklch border-[#5d6b68]/10',
                      )}
                      isActive={isActive}
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className="size-5" />
                        <span className="text-sm font-medium tracking-tight">
                          {item.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4 py-2">
          <Separator className="opacity-10 text-[#5d6b68]" />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => {
                const isActive = item.href === pathname

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      className={cn(
                        'h-10 border border-transparent hover:bg-linear-to-r/oklch from-sidebar-accent from-5% via-sidebar/50 via-30% to-sidebar/50 hover:border-[#5d6b68]/10',
                        isActive && 'bg-linear-to-r/oklch border-[#5d6b68]/10',
                      )}
                      isActive={isActive}
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className="size-5" />
                        <span className="text-sm font-medium tracking-tight">
                          {item.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  )
}
