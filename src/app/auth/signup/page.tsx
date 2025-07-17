import { AuthForm } from '@/components/auth-form'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center py-12px-4sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        <AuthForm mode="register" />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/auth" className="text-purple-600 hover:text-purple-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 