import Link from "next/link"
import { createServerClient } from "@/lib/supabase-server"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Welcome to Our App</h1>
            <p className="mt-3 text-lg text-muted-foreground">Sign in to access your personalized dashboard</p>
          </div>
          <div className="flex flex-col space-y-4">
            <Link href="/login" className="w-full">
              <Button className="w-full">Login</Button>
            </Link>
            <Link href="/signup" className="w-full">
              <Button variant="outline" className="w-full">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="mt-3 text-lg text-muted-foreground">Hello, {session.user.email}</p>
        </div>
        <div className="space-y-4">
          <form action="/api/auth/signout" method="post">
            <Button type="submit" variant="outline" className="w-full">
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

