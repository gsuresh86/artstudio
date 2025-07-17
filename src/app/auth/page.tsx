import { AuthForm } from '@/components/auth-form'

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        <AuthForm mode="login" />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?
            <a href="/auth/signup" className="text-purple-600 hover:text-purple-500 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 