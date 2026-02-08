'use client'

import { platformConfigs } from '@/lib/platform-config'
import type { Platform } from '@/lib/types'

interface PlatformToggleProps {
  platform: Platform
  label: string
  isSelected: boolean
  onChange: () => void
}

export default function PlatformToggle({
  platform,
  isSelected,
  onChange
}: PlatformToggleProps) {
  const config = platformConfigs[platform]

  return (
    <button
      onClick={onChange}
      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
        isSelected
          ? `${config.bgColor} text-white shadow-md`
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      }`}
    >
      <span className="text-lg">{config.icon}</span>
      <span>{config.label}</span>
    </button>
  )
}
