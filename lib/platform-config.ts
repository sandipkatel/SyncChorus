import type { Platform, PlatformConfig } from './types'

export const platformConfigs: Record<Platform, PlatformConfig> = {
  twitter: {
    name: 'twitter',
    label: 'Twitter/X',
    charLimit: 280,
    icon: '𝕏',
    color: 'text-black',
    bgColor: 'bg-black'
  },
  linkedin: {
    name: 'linkedin',
    label: 'LinkedIn',
    charLimit: 3000,
    icon: 'in',
    color: 'text-blue-700',
    bgColor: 'bg-blue-700'
  },
  facebook: {
    name: 'facebook',
    label: 'Facebook',
    charLimit: 63206,
    icon: 'f',
    color: 'text-blue-600',
    bgColor: 'bg-blue-600'
  },
  instagram: {
    name: 'instagram',
    label: 'Instagram',
    charLimit: 2200,
    icon: '📷',
    color: 'text-pink-600',
    bgColor: 'bg-pink-600'
  },
  threads: {
    name: 'threads',
    label: 'Threads',
    charLimit: 500,
    icon: '@',
    color: 'text-slate-900',
    bgColor: 'bg-slate-900'
  }
}

export const allPlatforms: Platform[] = ['twitter', 'linkedin', 'facebook', 'instagram', 'threads']
