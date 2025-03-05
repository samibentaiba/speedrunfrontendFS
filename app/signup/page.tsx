import Link from "next/link"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import { SignUpForm } from "@/components/signup-form"

export default async function SignUpPage() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Redirect to home if already logged in
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign up to get started with our app</p>
        </div>
        <SignUpForm />
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

