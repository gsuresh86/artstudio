'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Edit2, Save, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface User {
  id: string
  email: string
  created_at: string
  last_sign_in_at?: string
  user_metadata?: {
    name?: string
  }
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user as User)
        setName(data.user.user_metadata?.name || '')
      }
      setLoading(false)
    }
    getUser()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name: name }
      })
      if (error) throw error
      
      // Update local user state
      setUser((prev: User | null) => prev ? ({
        ...prev,
        user_metadata: { ...prev.user_metadata, name }
      }) : null)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setName(user?.user_metadata?.name || '')
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Not signed in</h2>
          <p className="text-gray-600 mb-4">Please sign in to view your profile</p>
          <a
            href="/auth"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
            Sign In
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Name */}
            <div className="flex items-center gap-4">
              <User className="h-5 w-5 text-gray-400"/>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                ) : (
                  <p className="text-gray-900">{user.user_metadata?.name || 'Not set'}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-gray-400"/>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>

            {/* Account Info */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <span className="text-gray-500">Member since:</span>
                  <p className="text-gray-900">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Last sign in:</span>
                  <p className="text-gray-900">
                    {new Date(user.last_sign_in_at || user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Actions */}
            {isEditing && (
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 transition-colors">
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 