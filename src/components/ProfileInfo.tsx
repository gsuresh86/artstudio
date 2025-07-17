"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface User {
  id: string
  email: string
  user_metadata?: {
    name?: string
  }
}

export function ProfileInfo() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user as User)
      }
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) return null
  if (!user) return null

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Welcome, {user.user_metadata?.name || user.email}!</h3>
      <p className="text-gray-700 text-sm">Email: {user.email}</p>
    </div>
  )
} 