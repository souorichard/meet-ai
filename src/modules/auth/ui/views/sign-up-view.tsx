'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleAlert, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { authClient } from '@/lib/auth-client'
import { SocialLogins } from './_components/social-logins'

const formSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email({ error: 'Invalid e-mail' }),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type FormValuesData = z.infer<typeof formSchema>

export function SignUpView() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const router = useRouter()

  const form = useForm<FormValuesData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit({ name, email, password }: FormValuesData) {
    setError(null)
    setIsPending(true)

    authClient.signUp.email(
      {
        name,
        email,
        password,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          setIsPending(false)
          router.push('/')
        },
        onError: ({ error }) => {
          setError(error.message)
          setIsPending(false)
        },
      },
    )
  }

  function onSocial(provider: 'github' | 'google') {
    setError(null)
    setIsPending(true)

    authClient.signIn.social(
      {
        provider,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          setIsPending(false)
        },
        onError: ({ error }) => {
          setError(error.message)
          setIsPending(false)
        },
      },
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 flex flex-col gap-6 md:p-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Let&apos;s get started</h1>
              <p className="text-muted-foreground text-balance">
                Create your account
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="⁕⁕⁕⁕⁕⁕⁕⁕"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="⁕⁕⁕⁕⁕⁕⁕⁕"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <CircleAlert className="size-4 text-destructive!" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    'Sign up'
                  )}
                </Button>
              </form>
            </Form>

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground">
                Or continue with
              </span>
              <Separator className="flex-1" />
            </div>

            <SocialLogins isPending={isPending} onSocial={onSocial} />

            <p className="text-sm text-center">
              Already have an account?{' '}
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>

          <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex md:flex-col md:gap-y-4 md:items-center md:justify-center">
            <Image
              src="/logo.svg"
              width={24}
              height={24}
              className="size-24"
              alt="Logo"
            />
            <p className="text-2xl font-bold text-white">Meet.AI</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
