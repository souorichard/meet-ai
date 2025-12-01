'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useTRPC } from '@/trpc/client'
import { getInitials } from '@/utils/get-initials'
import { agentsInsertSchema } from '../../schemas'
import type { AgentGetOne } from '../../types'

interface AgentFormProps {
  onSuccess?: () => void
  onCancel?: () => void
  initialValues?: AgentGetOne
}

type AgentForm = z.infer<typeof agentsInsertSchema>

export function AgentForm({
  onSuccess,
  onCancel,
  initialValues,
}: AgentFormProps) {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions())

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues?.id }),
          )
        }

        onSuccess?.()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }),
  )

  const form = useForm<AgentForm>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      intructions: initialValues?.intructions ?? '',
    },
  })

  const isEdit = !!initialValues?.id
  const isPending = createAgent.isPending

  function onSubmit({ name, intructions }: AgentForm) {
    if (isEdit) {
      console.log('TODO: update agent')
    }

    createAgent.mutate({ name, intructions })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Avatar className="size-16 border">
          <AvatarFallback>{getInitials(form.watch('name'))}</AvatarFallback>
        </Avatar>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="intructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="You are a helpful assistant that can answer questions and help with assignments."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-3">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => onCancel()}
              disabled={isPending}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : isEdit ? (
              'Update'
            ) : (
              'Create'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
