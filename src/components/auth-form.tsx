'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type LoginForm = z.infer<typeof loginSchema>
type RegisterForm = z.infer<typeof registerSchema>

interface AuthFormProps {
  mode?: 'login' | 'register'
}

interface FormErrors {
  [key: string]: { message: string } | undefined
}

export function AuthForm({ mode = 'login' }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm | RegisterForm>({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
  })

  // Type-safe error handling
  const getFieldError = (fieldName: string) => {
    return (errors as FormErrors)[fieldName]?.message
  }

  const onSubmit = async (data: LoginForm | RegisterForm) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: (data as LoginForm).email,
          password: (data as LoginForm).password,
        })

        if (error) {
          // Handle specific email confirmation error
          if (error.message.includes('Email not confirmed')) {
            setError('Please check your email and click the confirmation link before signing in. If you didn\'t receive the email, check your spam folder.')
          } else {
            throw error
          }
        } else {
          setSuccess('Successfully logged in!')
          // Redirect to home page after successful login
          setTimeout(() => {
            window.location.href = '/'
          }, 1000)
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: (data as RegisterForm).email,
          password: (data as RegisterForm).password,
          options: {
            data: {
              name: (data as RegisterForm).name,
            },
          },
        })

        if (error) throw error
        setSuccess('Account created successfully! Please check your email and click the confirmation link to verify your account. You can then sign in.')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 mt-2">
            {mode === 'login' 
              ? 'Sign in to your account to continue' 
              : 'Join our community of art lovers'
            }
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {mode === 'register' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  {...register('name' as keyof RegisterForm)}
                  type="text"
                  id="name"
                  className={cn(
                    "w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                    getFieldError('name') ? "border-red-300" : "border-gray-300"
                  )}
                  placeholder="Enter your full name"
                />
              </div>
              {getFieldError('name') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('email' as keyof (LoginForm | RegisterForm))}
                type="email"
                id="email"
                className={cn(
                  "w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                  getFieldError('email') ? "border-red-300" : "border-gray-300"
                )}
                placeholder="Enter your email"
              />
            </div>
            {getFieldError('email') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('password' as keyof (LoginForm | RegisterForm))}
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={cn(
                  "w-full pl-10 pr-12 py-3 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                  getFieldError('password') ? "border-red-300" : "border-gray-300"
                )}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {getFieldError('password') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('password')}</p>
            )}
          </div>

          {mode === 'register' && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  {...register('confirmPassword' as keyof RegisterForm)}
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  className={cn(
                    "w-full pl-10 pr-12 py-3 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                    getFieldError('confirmPassword') ? "border-red-300" : "border-gray-300"
                  )}
                  placeholder="Confirm your password"
                />
              </div>
              {getFieldError('confirmPassword') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('confirmPassword')}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="ml-2">
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              </div>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => reset()}
              className="text-purple-600 hover:text-purple-500 font-medium"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
} 