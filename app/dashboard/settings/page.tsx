import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
    <div className='flex items-center justify-center h-full m-3'>
      <UserProfile />
    </div>
    </div>
  )
}

export default Settings
